# Making the intro video yourself in Higgsfield

Two clips: desktop (16:9, 11 s) and phone (9:16, 7 s). Use the exact files and prompts below. The prompts were checked with the Higgsfield skill's linter and pass. Labels in the Higgsfield app may differ slightly from the ones written here.

## Desktop clip (about 11 credits on Seedance 2.0 Mini)

Files:
- `full-src-11s.mp4`: our walk-in, 11.0 s.
- `sign-ref.png`: the real sign.
- `gen1-anime-counter.png`: the anime still. It's already made, so you don't need to redo it.

Steps:
1. Open **Video**, then choose the model **Seedance 2.0 Mini**.
2. Set the duration to **11 s**, the resolution to **720p** and the aspect ratio to **16:9**. Turn **audio off**.
3. Add the references in this order:
   - the video `full-src-11s.mp4` as a **video reference**. It becomes `@video1`.
   - `sign-ref.png` as an **image reference**. It becomes `@image1`.
   - `gen1-anime-counter.png` as the **end frame** (last frame).
4. Paste the prompt from `gen3-full-prompt-seedance-2-0-mini.txt` exactly as it is.
5. Generate one take. If you like it, download the **MP4**.

If the corridor at the start looks wrong:
1. Make an anime still of the first frame of `full-src-11s.mp4` with Nano Banana 2, using the same prompt pattern as the counter still.
2. Add that still as the **start frame**.
3. Generate again.

## Phone clip (about 1.5 + 7 = 8.5 credits)

Files:
- `phone-src-7s.mp4`: our portrait walk-in, 7.0 s.
- `kf-phone-end.png`: its last frame.
- `sign-ref.png`.
- `gen1-anime-counter.png`.

**A. The phone still**
1. Open **Image** and choose **Nano Banana 2**. Set **9:16** and **1k**.
2. Add three image references in this order:
   - `kf-phone-end.png` (image 1);
   - `sign-ref.png` (image 2);
   - `gen1-anime-counter.png` (image 3, so the staff member looks the same).
3. Paste `phone-still-prompt-nano-banana-2.txt` and generate. Download the PNG.

**B. The phone video**
1. Open **Video** and choose **Seedance 2.0 Mini**. Set **7 s**, **720p**, **9:16**, with **audio off**.
2. Add the references:
   - `phone-src-7s.mp4` as the video reference (`@video1`);
   - `sign-ref.png` as an image reference (`@image1`);
   - the phone still from step A as the **end frame**.
3. Paste `phone-video-prompt-seedance-2-0-mini.txt`, generate and download the MP4.

## When you're done

Send both MP4s back. They'll be compressed for the web (H.264, faststart, at most about 3 MB) and swapped into the landing page intro. The red glow and seal stamp at the end stay in the page code.
