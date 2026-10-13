# Mocks for review

Two single-file mocks of the home page, built 13 Oct 2026 for studio approval. They are not the production site.

| File | Look | Artifact |
|---|---|---|
| `dist/variant-a.html` | A: Broadside (kraft, wood type, red overprint) in the neutomni.com layout, with an ink-outlined 3D bowl | https://claude.ai/artifact/9wgDiHQQdrt5RabMmhrgQK |
| `dist/variant-b.html` | B: the neutomni.com look (white, chilli red, sans with italic serif), with a glossy 3D bowl | https://claude.ai/artifact/EhKPmJkp9k8t23shTYxHmV |

Rebuild with `python3 mocks/build.py`. Sources:
- `src/body.html`: shared markup and copy.
- `src/base.css`: shared layout.
- `src/skin-*.css`: the two looks.
- `src/bowl3d.js`: Three.js r170 bowl. Ingredients drop in, the chilli-oil broth shader reacts to spice, and steam rises.
- `src/page.js`: GSAP ScrollTrigger and Lenis, the pinned four-step scrub, the Brisbane clock and open status, the order ticket, and the spice drag.

Placeholders, all labelled in the page:
- the two "Your footage goes here" slots, waiting for the Drive clips;
- the walk-in route, still to be checked on foot;
- the spice level names, still to come from the owner.

The order ticket is shown at the counter. It does not claim online ordering.
