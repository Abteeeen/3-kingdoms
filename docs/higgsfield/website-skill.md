# Higgsfield website skill: what it is and how we use it

Saved 13 Oct 2026 from https://higgsfield.ai/skills/website and https://higgsfield.ai/blog/build-website-with-ai. The full workflow text, "website-builder-flow", is served by the Higgsfield MCP connector itself through `get_workflow_instructions`. It isn't published as a repo or SKILL.md. Fetch it into this folder as `website-builder-flow.md` the first time the connector is authorised in a session.

## What it is

"Turn a product reference and prompt into a responsive, animated website with Higgsfield." It runs inside Claude through the Higgsfield connector.

Setup:
1. Copy the connector URL, `https://mcp.higgsfield.ai/mcp`.
2. Add it in claude.ai under Customize → Connectors.
3. Sign in.

The flow shown on the page:
1. Load the skill ("Website builder").
2. Plan the site.
3. Generate a product film with Higgsfield video.
4. Add narration.
5. Montage it with subtitles.
6. Build a responsive site with a **scroll-scrub hero tied to the film**.
7. Publish to a live link (`*.higgsfield.app`).

The prompt pattern on the page has these parts:
- a product reference (photo);
- a palette;
- two fonts;
- an accent colour;
- a visual sequence;
- the site features (chapters, forms, modals, marquees).

## Lessons from the blog's own build (worth following)

1. **Make the real assets first.** Supply product images before the site build. Generated-then-discarded assets still cost credits: 197 of 1,479 credits in their build went on discards.
2. **Describe behaviour, not layout,** in the first prompt.
3. **Fix one problem per message.**
4. **Every scroll animation needs a defined end state that's always reached.** Pin each animated section for its whole duration, and test at three scroll speeds: slow, normal and a fast flick.
5. **Check every factual claim.** Their agent invented product specs that read as plausible. For us that means prices, dishes, hours and spice levels come only from `research/current-presence/`.
6. **Watch the cost of a full agent build.** Theirs cost 1,479 credits, about $74 at 20 credits per dollar, and most of it was agent text, not media. The usage panel is the source of truth, not the agent's own estimate.

## The example closest to us

`https://stacked-burger.higgsfield.app/`, captured 13 Oct 2026. It is a burger built before your eyes:
- a frame sequence from one AI film is scrubbed by scroll;
- one ingredient lands per chapter ("It starts with the bun", "Smash and crust", "The cheese melts itself", "Crunch on top", "Stacked. Yours.");
- headlines are in HTML beside the image;
- the page ends on "Order now".

The page has no `<video>` tags. It's 9 images and a frame sequence.

**How this maps to 3 Kingdoms:** our Pick it, Weigh it, Spice it, Collect it section is the same story. A short AI film of a mao cai bowl filling up could become a scroll-scrubbed sequence there, beside or instead of the live 3D bowl. Real menu ingredients only, and our counter prices stay in HTML.

## Our rules for using it on this project

- **Nothing is generated without the studio's go-ahead.** For every job, we show the prompt, the reference files, the model, the settings and the estimated credits, and wait for a yes.
- **One generation at a time, at the lowest setting that proves the look.**
- **The `higgsfield` prompt skill (`.claude/skills/higgsfield/`) decides prompt wording and model choice.** The website itself stays our code (`mocks/`, later Next.js). We don't hand the whole build to Supercomputer, so the facts stay checked and the Broadside design stays ours.
- **Text, prices, the wordmark and Chinese characters stay in HTML,** crisp and bilingual. AI video is only the picture underneath.
