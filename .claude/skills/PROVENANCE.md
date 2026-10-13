# Skill provenance

Copied on 13 Oct 2026 from the reviewed, vendored copies in the Aspley repo (`Abteeeen/Aspley`, `.claude/skills/`). That repo's `PROVENANCE.md` records each skill's security review. Hashes for the `npx skills add` installs are in `skills-lock.json`.

| skill | upstream | commit or source |
|---|---|---|
| landing-page-design | elayadesign/ai-design-skills (skills/landing-page-design), MIT | 1c1e97c, added 13 Oct 2026. Markdown only, no scripts. **Part A only** applies in this repo (see CLAUDE.md). |
| frontend-design | anthropics/skills | dbd4588 |
| web-design-guidelines | vercel-labs/agent-skills | 063bee9. Fetches its rule list from raw.githubusercontent.com at review time. |
| react-best-practices | vercel-labs/agent-skills | 063bee9 |
| composition-patterns | vercel-labs/agent-skills | 063bee9 |
| ui-ux-pro-max | nextlevelbuilder/ui-ux-pro-max-skill | 026b6e1. Local CSV search only. |
| impeccable | pbakaus/impeccable v0.1.14 | 919dbeb. Its launcher downloads a SHA-verified engine binary on first run. |
| find-skills | vercel-labs/skills | skills-lock.json |
| high-end-visual-design | leonxlnx/taste-skill | skills-lock.json |
| emil-design-eng | emilkowalski/skills | skills-lock.json |
| core-web-vitals | addyosmani/web-quality-skills | skills-lock.json |
| copywriting | coreyhaines31/marketingskills | skills-lock.json |
| baseline-ui | ibelick/ui-skills | skills-lock.json |
| frontend-ui-engineering | addyosmani/agent-skills | skills-lock.json |
| gsap-core, gsap-scrolltrigger, gsap-timeline, gsap-react, gsap-performance | greensock/gsap-skills (official) | skills-lock.json |
| scroll-scrubbed-visual-sequence | mengto/skills | skills-lock.json |

Left out on purpose: the 3D skills (`threejs-*`, `awwwards-3d`, `spline-interactive`), because the chosen Broadside concept uses no 3D, and `shadcn`, which isn't planned. Add any of them with `npx skills add` if that changes.
