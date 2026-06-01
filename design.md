Current Lighthouse:

FCP: 0.6s
LCP: 1.2s
CLS: 0
TBT: 2700ms
Main Thread Work: 7.6s

Do NOT perform another general audit.

Focus only on the highest-impact remaining bottlenecks:

1. ProfessionalEvolution.tsx

   * Timeline measurements
   * ResizeObserver work
   * getBoundingClientRect usage
   * MotionValue chains

2. CoreStack.tsx

   * layout="position"
   * layout projection calculations
   * Framer Motion rendering cost

3. Global Framer Motion usage

   * useSpring
   * useTransform
   * useScroll
   * whileInView
   * AnimatePresence

4. Non-composited animations

   * Replace width/height/top/left animations
   * Use transform and opacity only

Task:

Implement the code changes.

For every change provide:

* file path
* before code
* after code
* estimated TBT reduction

Goal:

Reduce TBT from 2700ms to under 1000ms.

Do not optimize bundle size.
Do not optimize images.
Do not optimize SEO.

Focus exclusively on rendering, layout, and Framer Motion execution costs.
