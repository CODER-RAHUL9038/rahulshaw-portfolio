import "dotenv/config";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const url = process.env.UPSTASH_VECTOR_REST_URL;
const token = process.env.UPSTASH_VECTOR_REST_TOKEN;
const namespace = process.env.UPSTASH_VECTOR_NAMESPACE;

if (!url || !token) {
  console.error(
    "Missing UPSTASH_VECTOR_REST_URL or UPSTASH_VECTOR_REST_TOKEN in .env.",
  );
  process.exit(1);
}

const endpoint = `${url.replace(/\/$/, "")}/upsert-data${namespace ? `/${namespace}` : ""}`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const knowledgeDir = path.resolve(__dirname, "../src/data/rag");
const files = (await readdir(knowledgeDir))
  .filter((file) => file.endsWith(".json"))
  .sort();

const knowledge = (
  await Promise.all(
    files.map(async (file) => {
      const content = await readFile(path.join(knowledgeDir, file), "utf8");
      const chunks = JSON.parse(content);

      if (!Array.isArray(chunks)) {
        throw new Error(`Expected ${file} to contain a JSON array.`);
      }

      return chunks.map((chunk) => ({
        ...chunk,
        sourceFile: `src/data/rag/${file}`,
      }));
    }),
  )
).flat();

const seenIds = new Set();
for (const item of knowledge) {
  if (!item.id || !item.text || !item.title || !item.category) {
    throw new Error(`Invalid RAG item: ${JSON.stringify(item)}`);
  }

  if (seenIds.has(item.id)) {
    throw new Error(`Duplicate RAG item id: ${item.id}`);
  }

  seenIds.add(item.id);
}

const records = knowledge.map((item) => ({
  id: item.id,
  data: item.text,
  metadata: {
    title: item.title,
    category: item.category,
    year: item.year,
    source: item.sourceFile,
  },
}));

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(records),
});

if (!response.ok) {
  console.error(await response.text());
  process.exit(1);
}

console.log(
  `Seeded ${records.length} RAG knowledge chunks from ${files.length} files into Upstash Vector.`,
);
