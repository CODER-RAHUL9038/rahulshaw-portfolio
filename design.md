This is a TypeScript + Framer Motion typing issue in your animation variants.

The main error is:

Property 'visible' is incompatible with index signature

and especially this part:

ease: number[]

Framer Motion expects ease to be a specific easing type, not just a plain number[].

You probably wrote something like:

ease: [0.25, 0.1, 0.25, 1]

inside a variant object without proper typing.

WHY THIS HAPPENS

In newer Framer Motion + TypeScript versions:

Variants

has strict typing.

Your variant object is inferred incorrectly because TS thinks:

ease: number[]

instead of:

ease: Easing
FIX (BEST SOLUTION)

In the file around:

Hero.tsx line ~112

change your variants typing.

OPTION 1 — BEST FIX

Import Variants:

import { motion, Variants } from "framer-motion";

Then define:

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
    filter: "blur(8px)",
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: custom,
      ease: "easeOut",
    },
  }),
};
MOST IMPORTANT FIX

Replace THIS:

ease: [0.25, 0.1, 0.25, 1]

WITH:

ease: "easeOut"

OR:

ease: [0.16, 1, 0.3, 1] as const

The as const is critical if using arrays.

WHY as const WORKS

Without it:

number[]

With it:

readonly [0.16, 1, 0.3, 1]

which Framer Motion accepts as a cubic bezier easing tuple.

SECOND ISSUE (BOTTOM ERRORS)

These:

Link 'rel' attribute should include 'noopener'

are minor security warnings.

Fix:

target="_blank"

must ALSO include:

rel="noopener noreferrer"

Example:

<a
  href={link}
  target="_blank"
  rel="noopener noreferrer"
>
FINAL SUMMARY

Your issues are:

Framer Motion Variants typing mismatch
ease array typed incorrectly
Missing rel="noopener noreferrer"
QUICKEST FIX

Just change:

ease: [0.25, 0.1, 0.25, 1]

to:

ease: "easeOut"

and most errors will disappear instantly.