# 3 Kingdoms: website

The website for **3 Kingdoms (三国冒菜, "Three Kingdoms mao cai")**, a Sichuan mao cai counter at Shop 32, Level A, Uptown, 91 Queen St, Brisbane City QLD 4000. Phone 07 3190 0144. Operated by Jade Garden Pty Ltd (ABN 83 663 543 682). Mall listing: https://www.uptownbrisbane.com.au/stores/3-kingdoms

It is a counter-service restaurant with no table bookings. You order at the counter and collect your bowl. The site's jobs, in order:
1. Pickup orders at counter prices.
2. Getting people to the shop.
3. A real menu in English and Simplified Chinese.
4. A landing page for creators' followers.

Read `research/README.md` and `concepts/README.md` before any design or copy work.

## Facts (verified 13 Oct 2026, see `research/current-presence/`)

- **Hours:** Mon–Thu, Sat, Sun 11am–7pm; Fri 11am–7:30pm. Uptown, Google and Uber Eats agree. DoorDash shows 6:30pm and is wrong.
- **Counter prices:** Signature Mini Hotpot with rice $20.80. Other mini hotpots and noodle soups $19.80. Sides $6.90–$8.90. Delivery apps charge 22–34% more. Never publish an app price as the counter price.
- **Format:** choose broth, pick ingredients by weight (500g / 1000g bowls), choose from 6 spice levels. Most dishes "may contain nuts".
- **Location:** Level A, next to Target. "Hard to find" is the top review theme. Google wrongly shows "Floor Q".
- **Not yet confirmed with the owner:** the names of the 6 spice levels; how to reach the shop after Uptown closes (5:30pm Mon–Thu, while the shop trades until 7pm); whether Chapter 3 (Level E, same phone number) is a sister venue; who owns 3kingdoms.com.au; which pickup ordering provider to use. Never invent these.

## Chosen direction (chosen by our studio 13 Oct 2026; not yet shown to the client)

**Concept C, Broadside.** A letterpress street poster for the bowl, printed on takeaway-bag kraft. Every line fills the measure, red overprints a hair off-register, and each state change is one press. Full spec in `concepts/README.md`, live sketch in `concepts/concept-board.html`.
- **Palette:** kraft `#C9A57B`, carbon ink `#1C1A17`, chilli red `#D7261E`, peppercorn green `#6F8A2A`, ticket white `#FBFAF7`.
- **Type:** Big Shoulders Display, ZCOOL QingKe HuangYou for Chinese, Zilla Slab for body.
- **No 3D.**

## Skills

Twenty skills are vendored in `.claude/skills/`. Provenance is in `.claude/skills/PROVENANCE.md`. Do not edit vendored skill files; project additions go here or in `design-system/`.

| Skill | Use it for |
|---|---|
| `landing-page-design` | **Part A only**: intake, page structure, one primary action, conversion copy, FAQ, SEO/AEO, plus B8 content realism, B9 states and B10 ship requirements. **Part B visual rules (B1–B7, B11) do not apply**, by studio decision. They conflict with the chosen concept: one font only (no Chinese glyphs), no 900 weights, grey gradient headings, glass nav. |
| `impeccable` | Design direction, `shape`, `critique`, `polish`, `audit`, `animate`. Decides aesthetics with `frontend-design`. |
| `frontend-design`, `high-end-visual-design` | Aesthetic direction and anti-template rules. `high-end-visual-design` is advisory. |
| `ui-ux-pro-max` | Palette and type data, UX rules. Run `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>` from the repo root. |
| `copywriting` | All copy, in the brand's voice. |
| `emil-design-eng`, `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-react`, `gsap-performance` | Motion: the press-pull, band reflow, scroll moments. |
| `scroll-scrubbed-visual-sequence` | Any clip scrubbed on scroll, such as the walk-in route. |
| `composition-patterns`, `react-best-practices` | Component API and performance. |
| `baseline-ui`, `frontend-ui-engineering`, `web-design-guidelines`, `core-web-vitals` | Review gates before anything is called done. |
| `find-skills` | Finding a skill for a need none of the above covers. Review it before installing. |

**Who wins when skills disagree:**
- **Aesthetics:** `impeccable` and `frontend-design`, with `impeccable` winning ties.
- **Palette and type data:** `ui-ux-pro-max`.
- **Performance:** `react-best-practices`.
- **Component API:** `composition-patterns`.
- **Page strategy and conversion copy:** `landing-page-design` Part A.
- **Copy voice:** `copywriting`.

The studio's and the client's explicit words beat every skill.

## Rules

1. Read the relevant `SKILL.md` before writing code, and cite the rule when it drives a decision.
2. Every page passes `web-design-guidelines` and `react-best-practices` reviews before it is reported done.
3. Use real content from `research/current-presence/content-and-language.md`. No invented prices, dishes, reviews or claims.
4. English and Simplified Chinese from day one. Chinese dish names must come from a verified source or the owner. Mark machine translations for the owner to check.
5. Respect `prefers-reduced-motion`. Every scroll or press effect has a still fallback.
6. Video clips go in `research/clips/source/`, which is git-ignored. Commit only the compressed web versions the site uses.

## Git

Work on the branch assigned for the session. Commit skills and config separately from site code.
