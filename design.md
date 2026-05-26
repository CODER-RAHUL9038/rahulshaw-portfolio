Implement a premium cinematic 3D Project Flip Card system for the Featured Projects section using Framer Motion and the existing `projects.ts` data structure.

IMPORTANT:
- Preserve the current dark cinematic portfolio UI
- Do NOT redesign the existing FRONT side of the cards
- Keep the current card image, layout, spacing, hover style, and visual hierarchy exactly the same
- Only add the interactive flip system and backside details panel
- Maintain premium SaaS-quality motion and UI polish
- Avoid flashy gaming-style effects

==================================================
USE EXISTING PROJECT DATA
==================================================

Use the existing `projects.ts` structure directly.

Each project already contains:
- title
- description
- tech
- image
- status
- details.overview
- details.features
- details.technologies
- details.challenges
- details.learnings

Render backside content dynamically from the project data.

DO NOT hardcode content manually inside components.

==================================================
FLIP INTERACTION
==================================================

When user clicks a project card:

1. The card should smoothly flip in 3D space
2. Front side rotates away naturally
3. Back side becomes visible
4. Back side displays detailed project insights
5. Clicking again flips card back

The interaction should feel:
- cinematic
- immersive
- refined
- modern SaaS quality
- technically polished

NOT:
- flashy
- gimmicky
- gaming-style
- exaggerated

==================================================
VERY IMPORTANT — FIX THE 3D STRUCTURE PROPERLY
==================================================

Implement a CORRECT 3D card architecture.

Use:
- perspective on outer wrapper
- transform-style: preserve-3d
- backface-visibility: hidden
- proper rotateY transforms

REQUIRED STRUCTURE:

Outer wrapper:
- perspective: 1200px–1400px

Inner rotating container:
- transform-style: preserve-3d
- rotateY animation

Front face:
- backface-visibility: hidden

Back face:
- rotateY(180deg)
- backface-visibility: hidden

Parent rotates between:
- rotateY(0deg)
- rotateY(180deg)

This MUST prevent:
- mirrored text
- backwards backside
- distortion
- clipping
- broken rendering

The backside content must always appear perfectly readable.

==================================================
ANIMATION STYLE
==================================================

Use Framer Motion.

Animation requirements:
- smooth rotateY transition
- subtle perspective depth
- premium easing
- refined cinematic timing

Recommended:
- duration: 0.55–0.65s
- ease: cubic-bezier(0.16, 1, 0.3, 1)

Avoid:
- fast spins
- exaggerated motion
- heavy distortion
- cartoon effects

Motion style should feel similar to:
- Linear
- Vercel
- modern SaaS product UI

==================================================
FRONT SIDE RULES
==================================================

Do NOT redesign current front card.

Preserve:
- image
- title
- description
- tech badges
- hover glow
- spacing
- CTA placement
- cinematic styling

Only improve:
- interaction smoothness
- subtle hover polish

==================================================
BACKSIDE CONTENT LAYOUT
==================================================

Backside should dynamically render:

- Status badge
- Project Overview
- Key Features
- Technologies Used
- Engineering Challenges
- What I Learned

Layout should feel:
- recruiter-friendly
- readable
- structured
- premium

Avoid:
- long paragraphs
- clutter
- oversized text blocks

==================================================
BACKSIDE VISUAL STYLE
==================================================

Use:
- premium glassmorphism
- subtle gradient overlays
- ambient border glow
- elegant typography hierarchy
- muted secondary text
- refined spacing

Maintain:
- dark cinematic appearance
- luxury SaaS feel

Reduce:
- excessive blue glow
- RGB aesthetics
- overpowering blur

Glow should feel:
- soft
- ambient
- premium

==================================================
CONTENT REVEAL ANIMATION
==================================================

When card flips:
- backside content fades in smoothly
- subtle stagger animation
- slight blur reduction
- micro translateY only (4px–6px max)

Avoid:
- dramatic fly-ins
- large movements
- heavy stagger delays

==================================================
INTERACTION ENHANCEMENTS
==================================================

Add:
- “View Details” micro CTA
- animated arrow movement
- subtle hover anticipation
- responsive click feedback
- smooth icon transitions
- ambient glow pulse
- rotate-back icon/button

Interactions should remain:
- subtle
- premium
- cinematic
- refined

==================================================
CARD LAYERING & Z-INDEX
==================================================

Ensure:
- flipped card appears above neighboring cards
- no overlap glitches
- no clipping
- border radius remains smooth during rotation

Avoid:
- edge distortion
- overflow issues
- visual crowding

==================================================
MOBILE OPTIMIZATION
==================================================

Ensure:
- smooth touch interaction
- reduced perspective depth on mobile
- optimized FPS
- stable layout
- readable backside content
- no overflow issues

Reduce animation intensity slightly on smaller devices.

==================================================
FINAL EXPERIENCE GOAL
==================================================

The Featured Projects section should feel like:
- a premium interactive case-study showcase
- cinematic SaaS UI
- production-grade frontend craftsmanship
- immersive but professional

The experience should communicate:
“Refined engineering quality with attention to UX detail.”