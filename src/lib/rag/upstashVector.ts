export type RagSearchResult = {
  id: string;
  score: number;
  data?: string;
  metadata?: {
    title?: string;
    category?: string;
    source?: string;
  };
};

type UpstashVectorResponse = {
  result?: RagSearchResult[];
  error?: string;
};

function getVectorConfig() {
  const url = process.env.UPSTASH_VECTOR_REST_URL;
  const token = process.env.UPSTASH_VECTOR_REST_TOKEN;
  const namespace = process.env.UPSTASH_VECTOR_NAMESPACE;

  if (!url || !token) {
    return null;
  }

  return {
    endpoint: `${url.replace(/\/$/, "")}/query-data${namespace ? `/${namespace}` : ""}`,
    token,
  };
}

export function isRagConfigured() {
  return Boolean(getVectorConfig());
}

export async function retrieveRahulContext(query: string, topK = 5) {
  const config = getVectorConfig();

  if (!config) {
    return [];
  }

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: query,
      topK,
      includeData: true,
      includeMetadata: true,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Upstash Vector retrieval failed: ${message}`);
  }

  const payload = (await response.json()) as UpstashVectorResponse;
  return payload.result ?? [];
}

export function formatRetrievedContext(results: RagSearchResult[]) {
  return results
    .filter((result) => result.data)
    .map((result, index) => {
      const title = result.metadata?.title ?? result.id;
      const category = result.metadata?.category ?? "knowledge";
      return `[${index + 1}] ${title} (${category}, score: ${result.score.toFixed(3)})\n${result.data}`;
    })
    .join("\n\n");
}
