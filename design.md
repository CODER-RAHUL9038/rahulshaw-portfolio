You are now in EXECUTION MODE.

Do not perform another audit.

Implement the optimizations identified below directly in the codebase.

Current Lighthouse:

* Performance: 60
* FCP: 0.6s
* LCP: 1.1s
* CLS: 0
* TBT: 3420ms

Goal:

* Reduce TBT below 500ms
* Reduce layout cost
* Reduce style recalculation
* Reduce Framer Motion overhead
* Preserve design, UI, animations, and user experience

IMPORTANT:

Do NOT remove features.

Do NOT remove sections.

Do NOT simplify the portfolio visually.

Optimize implementation only.

---

## PHASE 1 – HIGHEST ROI FIXES

1. ProfessionalEvolution.tsx

Current issue:

A loop repeatedly calls:

getBoundingClientRect()

for multiple timeline nodes.

Implement:

* measurement caching
* minimize DOM reads
* avoid repeated synchronous layout calculations
* reduce ResizeObserver work
* recalculate only when necessary

Expected gain:
800ms–1200ms TBT reduction

---

2. CoreStack.tsx

Current issue:

Framer Motion layout projection is running across many skill items.

Implement:

* remove expensive layout projection
* replace layout="position" where possible
* use simpler motion variants
* use CSS transitions where projection is unnecessary

Expected gain:
600ms–900ms TBT reduction

---

3. ProfessionalEvolution MotionValue Optimization

Current issue:

Each timeline node creates multiple:

* useTransform
* useSpring
* reactive MotionValue chains

Implement:

* consolidate transforms
* reduce MotionValue count
* replace reactive chains with CSS classes where possible
* use shared calculations instead of per-node calculations

Expected gain:
400ms–600ms TBT reduction

---

## PHASE 2 – RENDERING OPTIMIZATION

4. FeaturedProjects.tsx

Current issue:

getBoundingClientRect() executes during mousemove.

Implement:

* cache dimensions on mouseenter
* store values in refs
* reuse cached values during mousemove
* preserve tilt effect

Expected gain:
Improved responsiveness and reduced layout thrashing

---

5. FeaturedProjects Entrance Animations

Current issue:

staggerChildren launches many expensive card animations simultaneously.

Implement:

* reduce animation startup cost
* delay heavy effects until interaction
* preserve appearance

Expected gain:
300ms–500ms TBT reduction

---

6. Hero.tsx

Current issue:

* infinite Typewriter loop
* infinite Framer Motion animation loops

Implement:

* move repeating decorative animations to CSS keyframes
* keep same appearance
* delay Typewriter initialization until after page stabilization

Expected gain:
150ms–300ms TBT reduction

---

## PHASE 3 – FRAMER MOTION OPTIMIZATION

Implement globally:

* LazyMotion
* domAnimation
* reduce unnecessary motion components
* eliminate expensive projection calculations
* add will-change: transform where beneficial

Search entire project for:

* useScroll
* useTransform
* useSpring
* AnimatePresence
* layout
* layoutId
* whileInView

Optimize every occurrence.

---

## PHASE 4 – VALIDATION

After implementing:

1. Show every modified file.
2. Show before/after code snippets.
3. Explain each optimization.
4. Estimate TBT reduction.
5. Estimate Lighthouse improvement.
6. Identify remaining bottlenecks.

Finally provide:

* Expected TBT
* Expected Layout Cost
* Expected Lighthouse Score

Do not stop after analysis.

Apply the code changes.
