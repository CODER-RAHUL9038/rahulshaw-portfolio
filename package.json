You are a Principal Frontend Performance Engineer.

Current Lighthouse:

Performance: ~85-90
FCP: 0.6s
LCP: 1.2s
CLS: 0
TBT: 790ms
Speed Index: 2.3s

Previous optimization work has already reduced TBT from 3420ms to 790ms.

Do NOT repeat previous audits.

We are now optimizing for the final 10-15 Lighthouse points.

Current Remaining Issues:

* Main Thread Work: 4.9s
* Reduce Unused JavaScript: 111KB
* Forced Reflow
* 9 Long Tasks
* 9 Non-Composited Animations
* Legacy JS: 13KB

Goal:

Push Lighthouse Performance to 90-95+.

---

## PHASE 1 – REMOVE REMAINING MAIN THREAD WORK

Search entire codebase for:

* useEffect
* useLayoutEffect
* useMemo
* useCallback
* requestAnimationFrame
* setInterval
* setTimeout
* ResizeObserver
* MutationObserver

Find:

* expensive initialization
* expensive mount work
* unnecessary effects

Implement optimizations.

Provide:

* file path
* code before
* code after
* estimated impact

---

## PHASE 2 – CLIENT COMPONENT REDUCTION

Audit every file with:

"use client"

Determine:

* can it become a Server Component?
* can part of it become a Server Component?

Create a table:

| File | Current | Optimized | Reason |

Implement safe conversions.

Goal:

Reduce hydration cost.

---

## PHASE 3 – AI ASSISTANT LAZY EXECUTION

Audit:

RecruiterAssistant

Determine:

* what loads on mount?
* what can load on interaction?

Implement:

* click-to-load
* viewport-based loading
* dynamic imports
* delayed hydration

Goal:

Zero AI-related work during initial page load.

---

## PHASE 4 – UNUSED JAVASCRIPT

Analyze remaining 111KB unused JS.

Identify:

* libraries
* components
* duplicate code

For each:

* size
* why loaded
* optimization

Implement reductions.

---

## PHASE 5 – NON-COMPOSITED ANIMATIONS

Search for animations affecting:

* width
* height
* top
* left
* margin
* padding
* box-shadow
* filter

Replace with:

* transform
* opacity

Use GPU-friendly rendering.

Add:

will-change: transform

where beneficial.

---

## PHASE 6 – FRAMER MOTION FINAL PASS

Audit all:

* motion.div
* AnimatePresence
* useScroll
* useTransform
* useSpring

Determine:

* which animations can be CSS-only
* which animations should run only after interaction

Implement:

* CSS keyframes where possible
* reduced motion overhead
* LazyMotion globally

---

## PHASE 7 – DOM SIZE REDUCTION

Audit DOM tree.

Identify:

* unnecessary wrappers
* deeply nested structures
* duplicate decorative layers

Reduce DOM complexity while preserving appearance.

---

## PHASE 8 – LONG TASK ELIMINATION

Find all tasks exceeding 50ms.

Identify:

* component
* hook
* effect
* animation

Optimize until:

TBT < 500ms

---

## FINAL REPORT

Provide:

1. Files changed
2. Code diffs
3. Main-thread reduction estimate
4. TBT reduction estimate
5. Hydration reduction estimate
6. Remaining bottlenecks

Target:

TBT < 500ms
Main Thread Work < 3s
Lighthouse 90-95+
Without changing the premium visual experience.
