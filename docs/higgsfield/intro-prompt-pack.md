Routing to higgsfield-prompt + higgsfield-seedance-vfx + higgsfield-seedance-2-5 (`omni_reference` video-to-video lane, VFX-PIPELINE) + higgsfield-gpt-image-2 / image-models.md (keyframe edit) + higgsfield-character-design + higgsfield-stack (preflight) + higgsfield-assist (credits), for an anime restyle of our own walk-in footage.

# 3 Kingdoms intro: Higgsfield prompt pack

**Status: draft. Nothing has been generated or submitted.** Drafted 13 Oct 2026 for the owner's approval. Every generation below needs the owner's yes, one at a time, after a live cost check. Not committed.

The owner wants three things:
- the landing-page intro to look much better;
- motion graphics;
- the real people replaced with anime characters.

The constraints: the lowest budget, one generation at a time, and the owner approves every prompt first.

**Short answer.**
1. Start with **one still image**, not a video. Redraw the sharpest frame of our clip as anime with Nano Banana 2. That frame shows the counter, the lit sign and the one person in the foreground. It costs about 1.5 credits (a hand-kept UI figure, so check it live). It answers the three open questions before any video spend:
   - Do we like the anime look on our own shop?
   - Do the anime people look warm and original?
   - Does the sign survive?
2. If the owner approves that still, run a 4-second, 480p video probe on Seedance 2.5. Then make the full 11-second intro.

---

## 1. Routing and files read

**Routing.**
- The job is "transform footage the user already has", so it routes to `higgsfield-seedance-vfx` (root `SKILL.md` routing table).
- That skill hands Seedance 2.5 plate jobs to the `omni_reference` lane in `higgsfield-seedance-2-5/VFX-PIPELINE.md`.
- The keyframe still routes to `image-models.md` § Routing by Asset Class and `higgsfield-gpt-image-2`.
- Text and logo motion is a `higgsfield-vibe-motion` vs `higgsfield-motion-design` decision (§2 D below).

**Read in full in this session** (all under `.claude/skills/higgsfield/`):

| File | Why |
|---|---|
| `SKILL.md` (root, v3.40.0) | HARD RULES, routing table, Load Map |
| `skills/higgsfield-prompt/SKILL.md` | MCSLA, I2V rules, iteration rule, anti-slop, positive phrasing |
| `skills/higgsfield-seedance-vfx/SKILL.md` + `references/first-frame.md` | Video-to-video doctrine, "inspect the clip", start-frame workflow |
| `model-guide.md` (Edit-Lane Chooser, Long-Take Chooser, credit table) | Which lane edits existing footage, and what each one bills |
| `skills/higgsfield-seedance-2-5/SKILL.md`, `VFX-PIPELINE.md`, `MODE-PLAYBOOKS.md` | `omni_reference` vs `video_edit`, role grammar, "one image, one role", duration = source, four-batch rule |
| `templates/seedance/anime-animation.md`, `templates/seedance/omni-reference-2-5.md` | Anime style block, IP-safe line, 2.5 brief skeleton |
| `skills/higgsfield-seedance/SKILL.md` (QUICK FACTS, prompt-craft laws, block scaffold, POSITIVE LOCKS, linter, drafts, rewrite playbook, output format), `ENGINE-RULES.md` | Required by the Load Map for any Seedance prompt; the 2.5 files defer to its block scaffold |
| `skills/higgsfield-vibe-motion/SKILL.md`, `skills/higgsfield-motion-design/SKILL.md` | Motion graphics: code vs AI pixels |
| `skills/higgsfield-stack/SKILL.md` | Two-step preflight (schema, then cost) |
| `skills/higgsfield-assist/SKILL.md` | Credit optimisation, Hero Frame method, ledger-first budgeting |
| `skills/shared/negative-constraints.md` | Prevention phrases (copied verbatim below) |
| `skills/higgsfield-character-design/SKILL.md` | Original-character discipline, Forbidden List, sheet laws |
| `skills/higgsfield-gpt-image-2/SKILL.md`, `image-models.md` (routing, Nano Banana 2, GPT Image 2 / 2.5, Flux Kontext, cost table) | Keyframe model choice |
| `specs/model-specs.yaml`, `specs/image-model-specs.yaml` (snapshot 2026-09-26, 17 days old, inside the 30-day limit) | Exact ids, enums, media roles |
| `production-benchmarks.md` | Acceptance-rate anchors |

**Project files read:**
- `CLAUDE.md`, `PRODUCT.md` and `concepts/README.md` (Broadside);
- `research/competitors/design-patterns-to-borrow.md`, `research/clips/README.md` and `mocks/video/make_intro.py`;
- `mocks/src/intro.html`, `mocks/src/page.js` (the intro logic) and `docs/higgsfield/website-skill.md` (our own Higgsfield rules).

**Footage inspected:** contact sheets of both rendered cuts, a per-frame sharpness scan, and sign crops.

---

## 2. Feasibility: can our people become anime characters?

**Yes.** The cleanest way is to redraw the **whole frame** as anime, people and room together, while keeping our camera path. Swapping only the people inside the real room is possible but riskier. The details follow.

### What is in our clip (inspected, not assumed)

`mocks/video/out/intro-desktop.mp4`: 1280×720, 30 fps, 375 frames, 12.5 s, faces already blurred.

| Time | What the frames show |
|---|---|
| 0.0–3.6 s | Bright Level A corridor, white tiles, red vending machines. Three or four shoppers walk away from the camera (one with a black backpack, one in a red T-shirt). |
| 3.65–4.1 s | A 0.45 s cross-dissolve from clip `120433` to clip `120702` |
| 4.1–7.0 s | Red lattice shopfront, tiled base, menu stand, the lit sign above the entrance |
| 7.0–10.4 s | Red dining room, rows of woven-cane lanterns, eight or more seated diners. One person in a navy polo walks right carrying a red menu folder. The frames here are motion-blurred by the 2.2× speed-up. |
| 10.4–11.6 s | Turn right to the counter. The person in navy reaches the order stand. Red drinks fridge with third-party branding, three hanging lanterns, the lit sign, backlit food panels. |
| 11.6–12.5 s | Push into the menu board: dense small text and prices |

**The sign** reads: white brush calligraphy **三国冒菜**, a red-outlined seal holding a stylised **3**, then **Kingdoms** in bold white letters under a thin white line.

**The sharpest frame** with people, sign and counter is **frame 346 (11.533 s)**. Its Laplacian sharpness is 275, against 81–85 in the dining-room stretch.

### Route comparison

| Route | How (skill-verified lane) | Honest risks | Cost basis (from the files) |
|---|---|---|---|
| **A. Whole-clip restyle (room and people) into anime**, keeping our camera path | `seedance_2_5`, `mode: omni_reference`, our clip as `video_references` (master for path and timing), duration = source. This is the field-proven video-to-video lane (VFX-PIPELINE § Stage 4). **Not `video_edit`.** The Mode Router says a full rebuild is `omni_reference`, and `video_edit` is for one scoped change, bills by source length and takes no start or end frame. | Not field-rated in the repo. Anime linework may flicker on a moving handheld walk. Small background diners may morph. The model may add furniture or more lanterns ("environment invention", drift #1). The sign and menu text may garble. The 0.45 s dissolve may come back as a cut or a morph. Upside: every face is invented, so no real identity survives. | **Not in the files.** Read it live (`get_cost`) before submitting. |
| A-alt, cheapest known price | `flux_3_video_edit`: one video plus a text prompt | No image input, so we can't pin the look or the end frame. No resolution or aspect controls. Prompt dialect "not yet documented here". Not field-rated. Whether it can do a full anime restyle is not stated. | **1 credit per second, first 15 s max** (catalog). Our 11 s cut would cost 11 credits. |
| A-alt, budget Seedance | `seedance_2_0_mini`: same role surface (video, image, start and end frames), 480p/720p, 4–15 s | Same risks as A. The 2.0 dialect has no field-run v2v anime case in the repo. | `higgsfield-assist` lists it as "Low cost" (a hand-kept tier, not a number). Price it live next to 2.5. |
| A-alt, other edit lanes | `kling_video_edit` (video plus image references, `mode` std/pro/4k), `gemini_omni_flash_1_1` `mode: edit` | Kling: the catalog states no source-length limit, and earlier UI doctrine says 3–10 s in, which our 11 s exceeds. Gemini edit: the output keeps the source length. Neither is field-rated. | Not stated. Read it live. |
| **B. Keep the real room, swap only the people** (mixed look) | Same `omni_reference` lane plus one grey-background character sheet per person (Nano Banana 2) and the performance-inheritance clause (VFX-PIPELINE § Stage 4) | About 15 people cross the walk. The engine tracks **at most 3 characters**, and crowds must be described as environment (ENGINE-RULES 5). So the diners would come out inconsistent, or stay as blurred real people beside crisp anime ones. The integration recipe (match grain, blur, light) is built for photoreal composites, so flat cel figures on a real plate read as pasted-in stickers. Style bleed either way is unmeasured. This route has the highest uncanny risk and needs more assets. | Character sheets: 1.5 credits each (Nano Banana 2, UI figure). The video cost is the same unknown as A. |
| **C. Keyframe route** | **C1:** redraw 1–2 of our frames with an image model (cheap). **C2:** image-to-video from start and end frames alone, with no video reference. | C1 is safe and cheap, and it is the Hero Frame method the skill recommends. C2 on its own **re-invents the camera path**: corridor to counter crosses three spaces, so it would lose our walk, our timing and the room layout. Use C2 only as a fallback for a stretch A can't hold (VFX-PIPELINE § Stage 5). | C1: 1.5 credits per still (Nano Banana 2, UI figure). |
| **D. Motion graphics** | **Keep in HTML and GSAP:** wordmark, seal stamp, kicker, prices, Chinese text, open status, buttons (already built in `mocks/src/intro.html` and `page.js`). **AI video:** the picture only. | Vibe Motion is the skill's tool for crisp animated text, but it exports a rendered video plus Remotion code. Baked-in text isn't selectable, bilingual-switchable, accessible or responsive, and we already have GSAP doing it. Motion Design (Seedance pixels) states "no guaranteed-crisp text". So neither is used for text. A textless AI flourish (say, a chilli-oil swirl transition) would be a later classicMD job, not now. | 0 credits |

**Recommendation: C1 then A** (keyframe first, then whole-clip restyle).
1. Redraw one frame (Gen 1).
2. Pin that still as the **end frame** of an `omni_reference` video-to-video run. Our clip drives the path and timing; the still carries the look, the palette and the hero character (Gen 2 probe, Gen 3 full).

The skill's own pipeline order is "images first, then video, always", and "a bad still cannot be rescued by the video prompt."

### Text risk: the sign 三国冒菜 3 Kingdoms

AI video doesn't promise frame-accurate text (2.5 SKILL.md § Hard Limits; ENGINE-RULES high-risk table: "keep story-critical text out of the generation"). The sign is our best wayfinding landmark ("hard to find" is the top review theme), so we try to keep it, with a ladder of fallbacks:

1. **The still decides first.** Gen 1 attaches a clean crop of the real sign (no people in it) and quotes the lettering exactly. Nano Banana 2 is listed for text rendering. Nothing goes to video until the still's sign is right.
2. **Fix the still, don't re-roll it.** If the lettering is off, use a one-line Nano Banana 2 edit on the result: `change the sign to the one in image two`, with the sign crop as image two. This is the field "fix, don't rebuild" pattern. If that fails, use a masked inpaint of the sign region (`mask` plus `is_inpaint: true`).
3. **In video, a reference image carries the glyphs, not the prompt.** The video prompts name the sign in English and point at the sign photo (`@image1`, "partial-preserve: lettering and layout only").
   - Quoting the Chinese characters in the video prompt failed the skill's linter: any CJK character triggers the Chinese-prompt 1,800-character cap.
   - The block scaffold also says "English prompts only".
   - The pinned end frame then holds the sign in the last frame, which sits behind our HTML wordmark.
4. **Judge legibility only at final resolution.** 480p hides it (Seedance § Drafts Validate the Prompt).
5. **Post fallback.** If the sign still garbles while it is large (about 3.5–6.5 s and 9.8–11 s of the 11 s cut), planar-track the sign patch from the approved still over it in the edit.
6. **Last resort.** Let the AI sign go soft and let the HTML wordmark carry the name. The real photos in "Find us" then do the wayfinding.

The **menu board** (prices, dish names) is worse: garbled prices next to real dishes would look like wrong facts. Three measures:
- the cut **ends on frame 346**, before the push into the board;
- the prompts keep the board's small print slightly soft;
- the drinks fridge and vending machines are drawn plain, with no third-party logos (brand/IP filter, `negative-constraints.md`).

### Privacy

- Upload only the **face-blurred** cut (`mocks/video/out/intro-desktop.mp4`), never the raw `research/clips/source/` clips with visible faces.
- The sign crop contains no people (checked).
- YuNet may have missed a few tiny distant faces (`research/clips/README.md`), and uploading sends the frames to a third party. Get the venue's OK before Gen 2.
- The anime redraw removes real identities. Still check every frame that no photographic face survives.

---

## 3. Recommended first generation: Gen 1, the anime keyframe (one still)

**Why a still and not a video.** It is the cheapest generation that proves the look. Three skill sources back this:
- `higgsfield-assist` § Hero Frame Efficiency Method;
- `higgsfield-seedance-vfx` § First / start-frame workflow ("lock it as a still first… you approve a single image cheaply");
- VFX-PIPELINE ("images first, then video, always").

The still is then reused as the end frame of every desktop video, so the credits aren't wasted.

**Why Nano Banana 2.** `image-models.md`:
- **"holds its input images best"**, which is what keeping our composition needs;
- "precision text rendering";
- "style transfer… 'Show me the animation style image version'";
- the **lowest listed price** of the editing-capable candidates (1.5 credits).

The others:
- GPT Image 2 has the strongest Chinese text, but its credits are "confirm in UI, premium tier expected", "GPT skews yellow", and its MCP and CLI parameter sets disagree.
- GPT Image 2.5 Sunburst is "not yet field-rated" and its prompt dialect is undocumented.

GPT Image 2 is the fallback if the sign won't come right.

```
Model:         nano_banana_2   (MCP / web UI id. CLI WARNING: on the CLI use `nano_banana_flash`;
                                `higgsfield model get nano_banana_2` answers as Nano Banana Pro — image-models.md)
Mode:          image edit from references (no mode param on this model)
aspect_ratio:  16:9            (enum: auto, 1:1, 3:2, 2:3, 4:3, 3:4, 4:5, 5:4, 9:16, 16:9, 21:9)
resolution:    1k              (enum: 1k, 2k, 4k; 1k is the lowest and the listed 1.5-credit tier)
is_inpaint:    false (default)  mask: none
Batch:         1 image
Duration:      n/a (still image)
Media:         image_references × 2
  image 1  research/clips/frames/higgsfield/kf-counter-f346.png   frame 346 (11.533 s) of the face-blurred desktop cut
  image 2  research/clips/frames/higgsfield/sign-ref.png          clean crop of the real sign, no people in it
MCSLA:  M nano_banana_2 · C static medium-wide, our framing · S counter-staff character + room ·
        L flat cel anime, #D7261E red, warm amber, #1C1A17 shadows · A reading the order sheet
Camera:        static (a still; framing inherited from frame 346). Motion preset: none.
```

**Make the two inputs** from the repo root. Commands were tested in a scratch folder: a 1280×720 PNG and a 780×290 PNG.

```bash
mkdir -p research/clips/frames/higgsfield
# image 1: exact frame 346 of the face-blurred desktop cut (sharpest frame with person + sign + counter)
ffmpeg -i mocks/video/out/intro-desktop.mp4 -vf "select=eq(n\,346)" -frames:v 1 research/clips/frames/higgsfield/kf-counter-f346.png
# image 2: the shop sign from the portrait clip at 1.0 s, cropped to the sign board only (no faces in the crop)
ffmpeg -ss 1.0 -i research/clips/source/20261013_115928.mp4 -frames:v 1 -vf "crop=780:290:180:400" research/clips/frames/higgsfield/sign-ref.png
```

**Prompt** (Nano Banana 2, plain prose; the skill says short direct prompts work on this model):

```
Static medium-wide frame: redraw image 1, a restaurant interior at the order counter, as hand-drawn 2D anime. Keep its exact composition, angle and framing: red fridge left, three red lanterns centre, lit sign on the navy back wall, counter right, one person at the order stand left.

Style and palette: clean uniform-weight linework, flat cel shading, subtle 2D glow on lanterns and sign; walls chilli red #D7261E, warm amber lantern light, shadows deep warm brown #1C1A17.

The person becomes an original anime counter-staff character: short black hair, small red chilli-shaped hair clip above the left ear, navy polo, same pose, eyes on the pink order sheet, cheeks lifted in a small closed-mouth smile. Draw a new face; the blur in image 1 is a privacy mask.

The sign copies image 2's lettering exactly: white brush calligraphy "三国冒菜", a red seal with a stylised "3", "Kingdoms" in bold white under a thin white line.

Plain red fridge, no logo. Only what image 1 shows. Original design, not based on any existing anime, manga or game. Anatomically correct, all limbs visible and naturally positioned.
```

**The character** (original, `higgsfield-character-design`):
- **Who:** counter staff. In our footage this person carries a red menu folder through the room to the order stand.
- **Silhouette kept from the plate:** short black hair, navy polo.
- **Brand tie:** a small **red chilli-shaped hair clip**.
- **Warmth** is written as visible behaviour, not a label: "cheeks lifted in a small closed-mouth smile".
- **Forbidden List** (Broadside and the research): armoured generals, halberds, battle banners, game art, Guan Yu red face, extra lanterns, dragons, gold-on-red, "chop suey" lettering, and any existing anime franchise look. The prompt enforces this positively with "Only what image 1 shows" and "Original design, not based on any existing anime, manga or game".

**Negative constraints**, copied verbatim from `skills/shared/negative-constraints.md`:
- "Anatomically correct, all limbs visible and naturally positioned" (Body / Motion → floating limbs).
- Brand/IP row: describe it by appearance, with no branding. Written as "Plain red fridge, no logo", a short lock that passes the file's ban test, because left alone the model copies the logo.
- Named-real-person row: original characters only. The blurred real face is called "a privacy mask" so the model draws a new face.

**Free preflight** (`python3 .claude/skills/higgsfield/scripts/preflight.py --model nano_banana_2 --param resolution=1k --param aspect_ratio=16:9 --param is_inpaint=false --media image_references=2`):

```
Platform preflight — nano_banana_2 — UNCHECKED
  ✓ [PASS] resolution=1k — specs: nano_banana_2 supports resolution: 1k, 2k, 4k
  ✓ [PASS] aspect_ratio=16:9 — specs: nano_banana_2 supports aspect_ratio: auto, 1:1, 3:2, 2:3, 4:3, 3:4, 4:5, 5:4, 9:16, 16:9, 21:9
  · [INFO] is_inpaint=False — no enum, range or type on record
  ✓ [PASS] media image_references×2
  note: no platform rules on record for nano_banana_2 in the CLI baseline — its cross-parameter rules are UNCHECKED
exit=0
```

**Lint** (`scripts/seedance_lint.py --preflight --file gen1.txt`, filter lint only; this is a Seedance linter run on an image prompt): **WARN**.
- `long — 189 words`. The threshold is 180, a Seedance video-encoder risk line. The prompt stays under the skill's 200-word cap (HARD RULE 8).
- `no-camera`. A still has no camera move.

There are no filter hits: no names, IP, violence or age words. Earlier drafts were fixed along the way:
- the 299-word and 243-word drafts FAILED overlength;
- the 192-word draft warned no-setting.

**Estimated cost: 1.5 credits.** That is the `image-models.md` table figure for Nano Banana 2 at 1K, which the file says is a hand-kept UI claim to "verify live before quoting". Before submitting, run the live cost check: MCP `generate_image` with `get_cost: true`, or CLI `higgsfield generate cost nano_banana_flash …` after `higgsfield model get nano_banana_flash`.
- **Planning:** our ledger has no rows (`higgsfield_memory.py ratio 3-kingdoms`: n=0). The skill's labelled default for a simple shot is 2–3 tries per keeper, so plan on about 3–4.5 credits for an approved still.

**Approve the still only if all of these hold** (hard gates, from the skill's cull rubric):
1. The composition matches frame 346.
2. The staff character looks original and warm, with the chilli clip visible.
3. The sign reads 三国冒菜 / 3 seal / Kingdoms.
4. The fridge has no logo.
5. There are no extra lanterns or decorations.
6. No photographic face is left.
7. The red stays saturated.

If only the sign is wrong, apply the one-line fix (§2). Don't re-roll.

---

## 4. Follow-up generations (only after Gen 1 is approved)

The skill's rules apply throughout:
- one variable changes per retry;
- if the same defect comes back twice, rewrite instead of re-rolling (the troubleshoot stop-rule default; the four-batch rule is the ceiling);
- log every result with `scripts/higgsfield_memory.py log-gen 3-kingdoms …` (the 5-second rule).

### Gen 2: a 4-second video probe at 480p

This proves the anime look holds in motion on our camera path. It covers the dining room, the turn to the counter and the staff character walking.

```
Model:          seedance_2_5
mode:           omni_reference
duration:       4             (enum 4–30 s; = source length, VFX-PIPELINE "duration = source")
resolution:     480p          (enum 480p / 720p / 1080p; cheapest tier, prompt validation)
aspect_ratio:   16:9          (enum auto, 21:9, 16:9, 4:3, 1:1, 3:4, 9:16)
generate_audio: false         (the site plays it muted; whether this lowers credits on 2.5 is not stated)
bitrate_mode:   standard
extension_mode: (not allowed outside video_extension)
Media:  video_references × 1  probe-src-4s.mp4  (frames 227–346 of the desktop cut, exactly 4.000 s / 120 frames)
        image_references × 1  sign-ref.png      (@image1 in the prompt)
        end_image        × 1  the approved Gen 1 still (attached ONCE — 2.5 rule "one image, one role")
Camera: inherited from @video1 (stabilised handheld walk-in), 63° FOV. Motion preset: none (a preset would replace our path).
```

```bash
# source clip for Gen 2: last frame = frame 346 = the Gen 1 keyframe (checked: mean pixel difference 1.19, re-encode noise)
ffmpeg -i mocks/video/out/intro-desktop.mp4 -vf "trim=start_frame=227:end_frame=347,setpts=PTS-STARTPTS" -an \
  -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -movflags +faststart research/clips/source/higgsfield/probe-src-4s.mp4
```

(Create `research/clips/source/higgsfield/` first. `source/` is git-ignored, per CLAUDE.md rule 6.)

**Prompt** (block scaffold with 2.5 role grammar):
- every material has a role, an exclusion and a fidelity grade;
- beat lines name the character, not the handle;
- CAMERA sits third in the core layers;
- the anime style block is adapted (see the note below);
- POSITIVE LOCKS come last.

```
SCENE CONTEXT
A 4-second walk-in clip inside a small Sichuan mao cai restaurant in a city shopping centre, redrawn as a hand-drawn 2D anime film. One continuous camera move carries the viewer through the red dining room and turns right to the order counter under the lit shop sign. The room, the lanterns, the furniture and every person are redrawn in anime; the camera path, framing and timing come from the source footage.

ACTIVE REFERENCES
@video1 — source footage: the master for camera path, framing, lens, motion, pacing, duration, and the position and movement of every person. Full-preserve for motion and layout; redraw every pixel in the anime style below. The faces in @video1 are blurred for privacy; draw complete new anime faces.
@image1 — a photo of the shop sign. Partial-preserve: it defines only the sign's lettering and layout — four white brush-calligraphy Chinese characters, a small red seal with a stylised "3", and the word "Kingdoms" in bold white letters under a thin white line. Do not take its photo texture, grain or the wall around it.
End frame (attached once, as the platform end frame) — the approved anime still of the counter. It is the last frame of the clip: the camera arrives on exactly that composition. Its drawing style, line weight, cel shading, palette and the counter staff member's design apply to every frame of the clip; its composition applies only to the last frame.

FORMAT MODE
One continuous shot, the camera does not cut on its own.

CAMERA
Same path as @video1: a chest-height stabilised forward drift through the dining room, then a smooth turn to the right that ends on the counter, the three hanging lanterns and the lit sign, matching the end frame. 63° field of view, no drift mid-segment.

ACTION
The counter staff member — short black hair, small red chilli hair clip, navy polo — carries a red menu folder from the middle of the dining room to the order stand on the right and starts reading the order sheet. They inherit the moving person's exact performance in @video1 frame by frame: same path, pace, body position and arrival, same silhouette scale and screen position at every frame. The seated diners in office shirts and hoodies stay at their tables eating from bowls, as background figures with the same small movements as in @video1.

PERFORMANCE
Counter staff member: shoulders relaxed, eyes on the order sheet, cheeks lifted in a small closed-mouth smile.

LIGHTING
Practical light only: warm amber glow from the red woven lanterns and the ceiling downlights in the dining room, cool white neon from the sign, a cool blue cast on the back wall above the counter. 3200K warm key in the dining room.

COLOR GRADE
The dominant colour is the dining room's lacquer red, close to #D7261E. Lantern light is warm amber. Shadows are deep warm brown, close to #1C1A17. Blue lives only on the back wall around the sign.

STYLE
2026 animation style anime animation. 2d anime glow subtle effect. Clean, uniform-weight linework and simple, flat cel-shading. Classic animated colour that keeps the room's saturated red. Gradient shifts are minimized. The overall composition is simplified. Original character designs, not based on any existing anime, manga or game.

POSITIVE LOCKS
The set contains only what @video1 shows — no added furniture, rooms, or geography beyond the reference. The drinks fridge is plain red with no logo or lettering. The sign shows the four calligraphy characters, the red "3" seal and "Kingdoms" exactly as drawn in @image1, glowing in the same place in every frame. Small print on the food panels sits slightly soft behind the sign. The counter staff member keeps the chilli hair clip, short black hair and navy polo in every frame: consistent character appearance, same outfit and features throughout. Anatomically correct, all limbs visible and naturally positioned. Distinct body separation between characters. Smooth, fluid motion, one action per shot. Every person is drawn in the same anime style as the room. Camera path, framing and timing identical to @video1. No on-screen captions.
```

**MCSLA mapping** (HARD RULE 4):
- **M:** `seedance_2_5`.
- **C:** the CAMERA block.
- **S:** the staff character and the diners.
- **L:** the LIGHTING, COLOR GRADE and STYLE blocks.
- **A:** the ACTION block.

**Negative constraints**, verbatim from the shared file:
- "Anatomically correct, all limbs visible and naturally positioned";
- "distinct body separation between characters";
- "consistent character appearance, same outfit and features throughout";
- "smooth, fluid motion, one action per shot".

Plus the Seedance environment-invention lock, verbatim: "the set contains only what the reference shows — no added furniture, rooms, or geography beyond the reference". "No on-screen captions" stays as a short ban because unrequested subtitles were the model's default failure on 2.0.

**Anime style block, adapted.** The source is `templates/seedance/anime-animation.md`, which says to paste it verbatim. I deviated on purpose; the owner should know why:
- **Kept:** "2026 animation style anime animation", "2d anime glow subtle effect", "clean, uniform-weight linework and simple, flat cel-shading", "Gradient shifts are minimized. The overall composition is simplified."
- **Dropped "Give multiple faces close-ons and different POV shots".** It asks for cuts, and our job is one continuous walk-in path.
- **Replaced "soft, muted" palette** with "keeps the room's saturated red". The venue's red is the brand.
- **Dropped "soft and even" lighting.** The LIGHTING block owns the light, and our lanterns and neon are directional practicals.
- **Dropped "subtle non precise…".** It risks wobbly lines across frames.
- **Not pasted: the template's IP-safe line.** Its "NO TEXT… NO LOGO(S)" would erase our real sign, "RESPECT THE MANGA IMAGE PANELS" refers to manga uploads we don't have, and it is a negative list, which Seedance reads as content. Its intent is kept positively: "Original character designs, not based on any existing anime, manga or game", the role exclusions, and "no logo" scoped to the fridge.

**Free preflight:** `preflight.py --model seedance_2_5 --param mode=omni_reference --param duration=4 --param resolution=480p --param aspect_ratio=16:9 --param generate_audio=false --param bitrate_mode=standard --media video_references=1 --media image_references=1 --media end_image=1` → **PASS**. Every spec enum passes, and so do all nine platform rules. The two that matter most:
- `params.mode == "omni_reference" || (params.start_image == null && params.end_image == null)`: end frame only in `omni_reference`, PASS.
- `size(image_references) + start + end <= 30` and the 50-item cap: PASS.

**Lint:** `seedance_lint.py --preflight --model seedance_2_5 --mode omni_reference --duration 4 --resolution 480p --ar 16:9 --media video_references=1 --media image_references=1 --media end_image=1` → **PASS** ("Safe to generate", 688 words, block-scaffold regime detected, no structural issues).
- **Memory recall notes:** F-004 real-person and F-002 brand/IP. Both are already handled: original characters, no brand names.
- **The earlier draft FAILED `zh-overlength`.** It quoted 三国冒菜 in the prompt, and the linter treats any Chinese character as a Chinese prompt with a 1,800-character cap. Fixed by describing the glyphs in English and letting the sign photo carry them.

**Estimated cost: not in the skill files.** `seedance_2_5` has no price in the specs, `model-guide.md` or `image-models.md`. The only facts on record:
- `video_edit` "bills by the source video's duration";
- a Cinema Studio 4.0 480p 5 s **t2v** estimate of 15 credits on 2026-09-26. That is a different model id with no media attached, and the file says video references change the price, so **it isn't a quote**.

Get the real number live:
1. **Schema:** `models_explore(action="get", model_id="seedance_2_5")` or `higgsfield model get seedance_2_5`.
2. **Cost:** `generate_video` with the exact params and media and `get_cost: true`, or `higgsfield generate cost seedance_2_5 --mode omni_reference --duration 4 --resolution 480p --aspect_ratio 16:9 …`. Check flag spellings against `model get` first.

Show the owner the number, and the MCP `adjustments` block, before the yes. Price `seedance_2_0_mini` (480p, 4 s, the same media) in the same check. If it is much cheaper, I'll re-dialect the prompt for 2.0 and re-lint it.

**What the probe can and can't prove** (Seedance § Drafts Validate the Prompt). There is no seed parameter, so the 720p render is a fresh roll.
- **It proves:** structure, path obedience, identity contamination, and the content filter.
- **It can't prove:** fine detail, including sign legibility.
- **Pin the frame, not the roll:** the end frame carries the look.

### Gen 3: the full 16:9 intro, 11 s at 720p

```
Model: seedance_2_5 · mode omni_reference · duration 11 · resolution 720p (= our 1280×720 delivery)
aspect_ratio 16:9 · generate_audio false · bitrate_mode standard
Media: video_references 1 = full-src-11s.mp4 (frames 17–346: corridor → dissolve → shopfront → dining room → counter,
       exactly 11.000 s / 330 frames; ends on the Gen 1 keyframe, drops the menu-board push)
       image_references 1 = sign-ref.png · end_image 1 = approved Gen 1 still
Preflight: PASS (spec + all platform rules). Lint: PASS (856 words, block regime). An earlier draft FAILED
`violence-verb — shot` on "walk-in shot through…" — a real homograph (shot = fired); reworded to "walk-in clip that travels from…".
Est. cost: live only (see Gen 2). Default planning ratio for a complex shot is 4–6 takes per keeper (labelled default, ledger n=0).
```

```bash
ffmpeg -i mocks/video/out/intro-desktop.mp4 -vf "trim=start_frame=17:end_frame=347,setpts=PTS-STARTPTS" -an \
  -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -movflags +faststart research/clips/source/higgsfield/full-src-11s.mp4
```

**Prompt:** the same scaffold as Gen 2, plus three end-state stages (corridor shoppers → shopfront and sign → dining room → staff at the stand). It names the one cross-dissolve at about 3 s, matching the source (3.08–3.53 s after the trim), and adds a 5600K corridor light. Full text:

```
SCENE CONTEXT
An 11-second walk-in clip that travels from a city shopping centre into a small Sichuan mao cai restaurant, redrawn as a hand-drawn 2D anime film. The camera walks down a bright shopping-centre corridor, passes under the restaurant's lit sign, moves through the red dining room and turns right to the order counter. The corridor, the shopfront, the room, the lanterns and every person are redrawn in anime; the camera path, framing and timing come from the source footage.

ACTIVE REFERENCES
@video1 — source footage: the master for camera path, framing, lens, motion, pacing, duration, the one cross-dissolve, and the position and movement of every person. Full-preserve for motion and layout; redraw every pixel in the anime style below. The faces in @video1 are blurred for privacy; draw complete new anime faces.
@image1 — a photo of the shop sign. Partial-preserve: it defines only the sign's lettering and layout — four white brush-calligraphy Chinese characters, a small red seal with a stylised "3", and the word "Kingdoms" in bold white letters under a thin white line. Do not take its photo texture, grain or the wall around it.
End frame (attached once, as the platform end frame) — the approved anime still of the counter. It is the last frame of the clip: the camera arrives on exactly that composition. Its drawing style, line weight, cel shading, palette and the counter staff member's design apply to every frame of the clip; its composition applies only to the last frame.

FORMAT MODE
One continuous camera path with one soft cross-dissolve at about 3 seconds, exactly where @video1 has it. The camera does not cut on its own.

CAMERA
Same path as @video1: a chest-height stabilised forward walk down the corridor, the shopfront and its sign sliding in from the right, a turn into the entrance, a forward drift through the dining room, then a smooth turn to the right that ends on the counter, the three hanging lanterns and the lit sign, matching the end frame. 63° field of view, no drift mid-segment.

[Stage 1]
Initial state: the bright shopping-centre corridor, white floor tiles, the red shopfront on the right.
Primary event: shoppers in the corridor walk away from the camera — one with a black backpack, one in a red T-shirt and shorts — while the camera follows at walking pace.
End state: after the dissolve, the camera faces the red lattice shopfront with the lit sign above the entrance.

[Stage 2]
Continue from the previous stage: same camera height and walking pace.
Primary event: the camera passes the menu stand and enters the red dining room; diners in office shirts and hoodies sit at the tables eating from bowls.
End state: the camera is inside the dining room, lanterns in rows along both walls.

[Stage 3]
Primary event: the counter staff member — short black hair, small red chilli hair clip, navy polo — carries a red menu folder from the middle of the room to the order stand on the right, inheriting the moving person's exact performance in @video1 frame by frame: same path, pace, body position, silhouette scale and screen position. The camera turns right with them.
End state: the end frame — the staff member reading the order sheet at the stand, the counter, three hanging lanterns and the lit sign.

LIGHTING
Corridor: even cool-white fluorescent ceiling light, 5600K. Shopfront and dining room: practical light only, warm amber glow from the red woven lanterns and the ceiling downlights, 3200K. Counter: cool white neon from the sign and a cool blue cast on the back wall.

COLOR GRADE
Inside the restaurant the dominant colour is lacquer red, close to #D7261E, with warm amber lantern light and deep warm brown shadows close to #1C1A17. The corridor is pale grey and white with the red shopfront as its only strong colour. Blue lives only on the back wall around the sign.

STYLE
2026 animation style anime animation. 2d anime glow subtle effect. Clean, uniform-weight linework and simple, flat cel-shading. Classic animated colour that keeps the restaurant's saturated red. Gradient shifts are minimized. The overall composition is simplified. Original character designs, not based on any existing anime, manga or game.

POSITIVE LOCKS
The set contains only what @video1 shows — no added furniture, rooms, or geography beyond the reference. The vending machines and the drinks fridge are plain red with no logo or lettering. The sign shows the four calligraphy characters, the red "3" seal and "Kingdoms" exactly as drawn in @image1, in the same place in every frame it appears. Small print on the menu stand and the food panels sits slightly soft. The counter staff member keeps the chilli hair clip, short black hair and navy polo in every frame: consistent character appearance, same outfit and features throughout. Anatomically correct, all limbs visible and naturally positioned. Distinct body separation between characters. Smooth, fluid motion, one action per shot. Every person is drawn in the same anime style as the room. Camera path, framing and timing identical to @video1. No on-screen captions.
```

**Optional Gen 1b, before Gen 3 (about 1.5 credits).** If Gen 2 shows the corridor drifting in style, redraw the corridor's first frame (frame 17) with the same Nano Banana 2 prompt pattern and attach it as `start_image`. That is the skill's "pin both ends" approach. Leave it out unless Gen 2 shows the need: one variable at a time.

### Gen 4: the 9:16 phone version (a separate pair, after the desktop is approved)

The phone cut is a different camera path: `115928`, entrance → dining room → counter, 7.4 s. Its last frame shows the counter, the sign and **a real staff member behind the counter**, who becomes the same anime staff character. That gives the same brand tie on both devices.
- **Gen 4a:** `nano_banana_2`, 9:16, 1k. Redraw phone-cut frame 209 with the Gen 1 prompt adapted to that framing. Attach the Gen 1 still as the style and character reference, plus the sign crop. About 1.5 credits (UI figure).
- **Gen 4b:** `seedance_2_5`, `omni_reference`, duration 7, 720p, aspect_ratio **9:16**, `generate_audio: false`. Media:
  - `video_references` = `phone-src-7s.mp4` (exactly 7.000 s / 210 frames);
  - `image_references` = the sign crop;
  - `end_image` = the Gen 4a still.

  Preflight PASS. Cost: live only.

```bash
ffmpeg -i mocks/video/out/intro-phone.mp4 -vf "trim=end_frame=210,setpts=PTS-STARTPTS" -an \
  -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -movflags +faststart research/clips/source/higgsfield/phone-src-7s.mp4
```

**If the owner wants to spend nothing on the phone version**, there are two fallbacks:
1. **Centre-crop the 16:9 result:** `crop=405:720:437:0,scale=720:1280:flags=lanczos`. It costs 0 credits but is a 1.78× upscale, so it will be soft. It keeps the desktop path, which is wider than a phone needs.
2. **Keep today's real, face-blurred phone cut.** Phone and desktop then differ in look, which is acceptable because they are different devices.

### Cost summary

| Step | Model | Settings | Credits |
|---|---|---|---|
| Gen 1 keyframe | `nano_banana_2` | 1k, 16:9, 2 refs | **1.5** (UI table, verify live) |
| Sign fix, only if needed | `nano_banana_2` | one-line edit | 1.5 (UI table) |
| Gen 2 probe | `seedance_2_5` omni | 4 s, 480p | **read live**; not in files |
| Gen 1b, optional | `nano_banana_2` | 1k, 16:9 | 1.5 (UI table) |
| Gen 3 final desktop | `seedance_2_5` omni | 11 s, 720p | **read live** |
| Gen 4a / 4b phone | `nano_banana_2` / `seedance_2_5` | 1k 9:16 / 7 s 720p 9:16 | 1.5 / **read live** |
| (alt) whole-clip edit | `flux_3_video_edit` | 11 s | 11 (catalog: 1 credit/s) |

Plan prices in `model-guide.md` (hand-kept): Pro 700 credits a month, Ultimate 1,500.

---

## 5. How the result slots into the landing page

The `mocks/src/intro.html` and `mocks/src/page.js` behaviour stays as it is:
- the film **plays once, no loop**;
- on `ended`, the section gets `.ended` and the **seal stamps on in HTML**;
- "Watch the walk-in again" replays it.

The wordmark 三国冒菜 3 Kingdoms, the kicker, the price line ($20.80), the buttons and the open status all stay HTML: crisp, bilingual, with correct `lang` attributes.

1. **Encode** the approved Gen 3 for the web (from the repo root):
   ```bash
   ffmpeg -i gen3.mp4 -an -vf "scale=1280:720:flags=lanczos,fps=30" -c:v libx264 -profile:v high -crf 26 -preset slow \
     -pix_fmt yuv420p -g 60 -movflags +faststart mocks/video/out/intro-desktop.mp4
   ```
   - **Size:** the target is **≤ 3 MB** (today's real cut is 2.7 MB for 12.5 s). If it's over, raise `-crf` one step at a time. Flat cel shading usually compresses better than live footage.
   - **What to skip:** `make_intro.py`'s stabilise, grade and YuNet face-blur steps. The faces are invented and the grade is in the prompt. Still review frame by frame for any surviving real face.
2. **Posters:**
   - `poster-desktop.jpg` = frame 0 (`-ss 0 -frames:v 1 -q:v 4`).
   - `end-desktop.jpg` = the last frame.
   - **Suggestion:** under `prefers-reduced-motion`, `page.js` calls `end()` at once. Today that shows the corridor poster under the seal. Use the Gen 1 still (crisper than any video frame) as the reduced-motion image, so those visitors see the same counter-and-sign frame everyone else lands on.
   - Keep the poster light: it is the LCP element (`core-web-vitals`).
3. **Phone:** do the same for Gen 4b → `intro-phone.mp4`, 720×1280. Aim for about 1.5 MB (today 1.1 MB).
4. **Accessibility:** update the `<video>` `aria-label` to say it is an animated version of the walk ("Animated walk from the Level A corridor into 3 Kingdoms, through the red dining room to the counter").
5. **Build:** rebuild with `python3 mocks/build.py`. Commit only the compressed web files. Raw generations stay in git-ignored `research/clips/source/higgsfield/` (CLAUDE.md rule 6).
6. **Scroll-scrub later:** if the intro moves to a scroll-scrub later, re-encode with `-g 1` or a frame sequence (`research/clips/README.md`).
7. **Provenance:** Nano Banana outputs carry SynthID and C2PA (`image-models.md`).

---

## 6. Unverified, deviations and open questions

**Unverified:**
- No Seedance 2.5 credit price is in the files.
- Nano Banana 2's 1.5 credits is a hand-kept UI figure.
- `generate_audio: false` saving credits on 2.5 is not stated.
- Whether 2.5 holds the end frame better as the platform `end_image` or as an in-prompt first/last-frame declaration is "unmeasured".
- Seedance 2.5, `flux_3_video_edit`, `kling_video_edit` and `gemini_omni_flash_1_1` edit are all "not yet field-rated".
- That the 0.45 s dissolve survives video-to-video is untested.

**Deviations:**
- The anime style block is adapted and the IP-safe line is not pasted (§4 Gen 2).
- The video prompts carry no Chinese characters, to pass the linter (§2 text risk).
- This file sits in `docs/higgsfield/` as asked, not in the skill's `workspace/output/`.

**Open for the owner:**
- the venue's OK to upload the face-blurred footage;
- whether the person at the order stand is drawn as staff (as drafted) or as a diner;
- whether the phone version gets its own generation or a fallback.

**Execution surface:**
- The Higgsfield CLI is not installed here.
- No Higgsfield call was made.
- A connector needs authorising before the live cost checks.
