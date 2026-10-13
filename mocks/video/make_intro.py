#!/usr/bin/env python3
"""Cut the landing-page intro from our own walk-in footage (research/clips/source/).

Desktop: Level A corridor (120433) into the walk-in through the dining room to the counter sign (120702).
Phone:   portrait walk-in (115928).
Steps: trim and speed-ramp, stabilise (vidstab), grade, blur every detected face (YuNet), encode H.264 for the web.

Usage: python3 mocks/video/make_intro.py <yunet.onnx> <work_dir>
Writes mocks/video/out/intro-desktop.mp4, intro-phone.mp4 and poster JPEGs.
"""
import subprocess
import sys
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "research" / "clips" / "source"
OUT = Path(__file__).parent / "out"
MODEL, WORK = sys.argv[1], Path(sys.argv[2])
WORK.mkdir(parents=True, exist_ok=True)
OUT.mkdir(exist_ok=True)

GRADE = "eq=contrast=1.08:saturation=1.16:brightness=-0.015,colorbalance=rs=.03:gs=0:bs=-.04:rm=.02:bm=-.02,vignette=PI/5"


def run(*args):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", *args], check=True)


def segment(name, start, end, speed, w, h, tag):
    """Trim, speed up, stabilise and grade one clip into a high-quality intermediate."""
    src = SRC / f"{name}.mp4"
    trf = WORK / f"{tag}.trf"
    cut = WORK / f"{tag}-cut.mp4"
    run("-ss", str(start), "-to", str(end), "-i", str(src), "-an",
        "-vf", f"setpts=PTS/{speed},fps=30", "-c:v", "libx264", "-crf", "16", "-preset", "fast", str(cut))
    run("-i", str(cut), "-vf", f"vidstabdetect=shakiness=6:accuracy=12:result={trf}", "-f", "null", "-")
    out = WORK / f"{tag}.mp4"
    run("-i", str(cut), "-an", "-vf",
        f"vidstabtransform=input={trf}:smoothing=24:zoom=4:optzoom=0,unsharp=5:5:0.6,"
        f"scale={w}:{h}:force_original_aspect_ratio=increase,crop={w}:{h},{GRADE}",
        "-c:v", "libx264", "-crf", "16", "-preset", "fast", str(out))
    return out


def blur_faces(src, dst, w, h):
    """Detect faces on every frame and blur them; boxes persist 8 frames so the blur never flickers off."""
    det = cv2.FaceDetectorYN.create(MODEL, "", (w, h), 0.62, 0.3, 5000)
    cap = cv2.VideoCapture(str(src))
    enc = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{w}x{h}", "-r", "30",
                            "-i", "-", "-c:v", "libx264", "-crf", "17", "-preset", "fast", "-pix_fmt", "yuv420p", str(dst)], stdin=subprocess.PIPE)
    recent, frames, hits = [], 0, 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        frames += 1
        # detect at 1.5x for small, distant diners
        big = cv2.resize(frame, (int(w * 1.5), int(h * 1.5)))
        det.setInputSize((big.shape[1], big.shape[0]))
        _, faces = det.detect(big)
        boxes = [] if faces is None else [(f[:4] / 1.5).astype(int) for f in faces]
        # a real face in this footage is never wider than ~12% of the frame; bigger hits are lanterns and wall glare
        boxes = [b for b in boxes if 6 <= b[2] <= 0.12 * w and b[3] <= 0.12 * max(w, h)]
        hits += len(boxes)
        recent = [(b, ttl - 1) for b, ttl in recent if ttl > 1] + [(b, 8) for b in boxes]
        for (x, y, bw, bh), _ in recent:
            pad = int(max(bw, bh) * 0.45)
            x0, y0 = max(0, x - pad), max(0, y - pad)
            x1, y1 = min(w, x + bw + pad), min(h, y + bh + pad)
            if x1 - x0 < 4 or y1 - y0 < 4:
                continue
            roi = frame[y0:y1, x0:x1]
            k = max(15, ((x1 - x0) // 3) | 1)
            blurred = cv2.GaussianBlur(roi, (k, k), 0)
            mask = np.zeros(roi.shape[:2], np.uint8)
            cv2.ellipse(mask, ((x1 - x0) // 2, (y1 - y0) // 2), ((x1 - x0) // 2, (y1 - y0) // 2), 0, 0, 360, 255, -1)
            mask = cv2.GaussianBlur(mask, (21, 21), 0)[..., None] / 255.0
            frame[y0:y1, x0:x1] = (blurred * mask + roi * (1 - mask)).astype(np.uint8)
        enc.stdin.write(frame.tobytes())
    enc.stdin.close()
    enc.wait()
    print(f"  {dst.name}: {frames} frames, {hits} face detections blurred")


def web(src, dst, crf):
    run("-i", str(src), "-an", "-c:v", "libx264", "-profile:v", "high", "-crf", str(crf), "-preset", "slow",
        "-pix_fmt", "yuv420p", "-g", "60", "-movflags", "+faststart", str(dst))


def poster(src, dst, at):
    run("-sseof" if at < 0 else "-ss", str(at), "-i", str(src), "-frames:v", "1", "-q:v", "4", str(dst))


# Desktop 1280x720: corridor (2x) then the walk-in (2.2x), joined with a short cross-dissolve.
a = segment("20261013_120433", 1.0, 9.2, 2.0, 1280, 720, "d1")
b = segment("20261013_120702", 3.2, 22.8, 2.2, 1280, 720, "d2")
joined = WORK / "desktop-joined.mp4"
dur_a = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(a)]))
run("-i", str(a), "-i", str(b), "-filter_complex", f"[0][1]xfade=transition=fade:duration=0.45:offset={dur_a - 0.45:.2f},format=yuv420p",
    "-c:v", "libx264", "-crf", "16", "-preset", "fast", str(joined))
blurred = WORK / "desktop-blur.mp4"
blur_faces(joined, blurred, 1280, 720)
web(blurred, OUT / "intro-desktop.mp4", 27)

# Phone 720x1280: the portrait walk-in at 1.35x.
p = segment("20261013_115928", 0.0, 10.0, 1.35, 720, 1280, "p1")
pblur = WORK / "phone-blur.mp4"
blur_faces(p, pblur, 720, 1280)
web(pblur, OUT / "intro-phone.mp4", 28)

for n in ("desktop", "phone"):
    poster(OUT / f"intro-{n}.mp4", OUT / f"poster-{n}.jpg", 0.0)
    poster(OUT / f"intro-{n}.mp4", OUT / f"end-{n}.jpg", -0.1)
for f in sorted(OUT.iterdir()):
    print(f.name, f.stat().st_size // 1024, "KB")
