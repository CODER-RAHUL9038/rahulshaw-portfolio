Create a premium cinematic 3D Project Flip Card system for the Featured Projects section using Framer Motion.

IMPORTANT:
- Preserve the current dark cinematic portfolio UI
- Do NOT redesign the existing FRONT side of the project cards
- Keep the current front card layout, image placement, spacing, and styling exactly the same
- Focus only on adding a polished interactive flip experience
- Maintain a premium SaaS-quality aesthetic
- Avoid flashy gaming-style effects or exaggerated motion

--------------------------------------------------
MAIN OBJECTIVE
--------------------------------------------------

When a user clicks a project card:

1. The card should smoothly flip in 3D space
2. The front side should rotate away naturally
3. The back side should appear with detailed project insights
4. Clicking again or using a close interaction should flip the card back

The interaction should feel:
- cinematic
- immersive
- technically polished
- modern SaaS quality
- premium and refined

NOT:
- gimmicky
- flashy
- overanimated
- gaming-style

--------------------------------------------------
3D FLIP SYSTEM
--------------------------------------------------

Implement a clean premium 3D flip architecture using:
- transform-style: preserve-3d
- backface-visibility: hidden
- rotateY transitions
- subtle perspective depth
- smooth parent rotation

Ensure:
- smooth animation flow
- clean border radius during flip
- no clipping
- no visual distortion
- stable performance

--------------------------------------------------
ANIMATION STYLE
--------------------------------------------------

Use Framer Motion for all flip interactions.

Preferred animation style:
- smooth rotateY transition
- subtle 3D perspective
- cinematic easing
- refined timing
- premium motion polish

Recommended motion:
- rotateY(0deg → 180deg)
- duration: 0.55–0.65s
- perspective: 1000px–1400px
- ease: cubic-bezier(0.16, 1, 0.3, 1)

Avoid:
- fast spinning
- exaggerated rotation
- cartoon flip effects
- heavy distortion
- gaming-style transitions

The motion should feel similar to:
- Linear
- Vercel
- premium SaaS product cards

--------------------------------------------------
FRONT SIDE RULES
--------------------------------------------------

Do NOT redesign the current front side.

Preserve:
- project image
- title
- short description
- current spacing
- existing hover glow
- CTA placement
- premium cinematic styling

Only refine:
- interaction smoothness
- hover polish
- motion quality

--------------------------------------------------
GENERATE BACKSIDE CARD CONTENT
--------------------------------------------------

Automatically generate professional backside card content dynamically from the existing projects array.

Each project backside should contain:

1. Project Overview
2. Key Features
3. Technologies Used
4. Engineering Challenges
5. What I Learned

Generate concise recruiter-friendly content for:
- Rahul Shaw Portfolio
- Freight Intel Dashboard
- Camellia
- XORA AI
- Dr Maya Reynolds Website
- Weather App
- More Games & Projects

The generated content should:
- feel professional
- sound technically polished
- remain concise
- avoid buzzword overload
- match each project realistically

Avoid:
- long paragraphs
- oversized text blocks
- cluttered layouts

--------------------------------------------------
BACK SIDE VISUAL STYLE
--------------------------------------------------

The backside should use:
- premium glassmorphism
- subtle gradient overlays
- soft cinematic border glow
- elegant typography hierarchy
- muted secondary text
- refined spacing system

Maintain:
- dark cinematic appearance
- luxury SaaS feeling
- immersive UI depth

Reduce:
- excessive blue glow
- RGB/gaming aesthetics
- overpowering blur effects

Glow should feel:
- ambient
- subtle
- premium

--------------------------------------------------
CONTENT REVEAL ANIMATION
--------------------------------------------------

When the card flips:
- reveal backside content smoothly
- stagger detail appearance subtly
- fade content in softly
- use slight blur reduction
- use micro translateY only (4px–6px max)

Avoid:
- dramatic fly-ins
- large movement
- exaggerated stagger timing

The reveal should feel:
- elegant
- refined
- premium

--------------------------------------------------
INTERACTION ENHANCEMENTS
--------------------------------------------------

Add subtle premium interactions:
- micro hover anticipation
- slight hover scale
- soft glow increase
- animated arrow indicator
- smooth icon transitions
- responsive click feedback
- subtle ambient glow pulse

Add:
- “View Details” micro CTA
- animated arrow movement
- project status badge
- smooth close interaction

Keep interactions:
- refined
- responsive
- cinematic
- subtle

--------------------------------------------------
CARD LAYOUT & DEPTH
--------------------------------------------------

Ensure:
- flipped card gets proper z-index
- neighboring cards do not overlap visually
- perspective remains controlled
- border radius remains clean during rotation
- smooth layering during animation

Avoid:
- edge distortion
- clipping issues
- overflow glitches
- visual crowding

--------------------------------------------------
MOBILE OPTIMIZATION
--------------------------------------------------

Ensure:
- smooth touch interaction
- reduced perspective depth on mobile
- optimized animation performance
- readable backside content
- stable layout
- no overflow issues
- responsive spacing

Reduce:
- animation intensity on smaller devices
- excessive GPU-heavy effects

The interaction should remain:
- smooth
- lightweight
- cinematic
- readable

--------------------------------------------------
FINAL EXPERIENCE GOAL
--------------------------------------------------

The Featured Projects section should feel like:
- a premium interactive case-study showcase
- modern cinematic SaaS UI
- production-grade frontend craftsmanship
- immersive but professional

The interaction should communicate:
“Refined engineering quality with premium UX attention.”

NOT:
- flashy animation showcase
- gaming interface
- experimental 3D demo
- overengineered motion showcase