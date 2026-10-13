#!/usr/bin/env python3
"""Assemble each mock variant into one self-contained HTML file for an Artifact.

Usage: python3 mocks/build.py   (writes mocks/dist/variant-a.html and variant-b.html)
"""
import json
import re
import urllib.parse
from pathlib import Path

SRC = Path(__file__).parent / "src"
DIST = Path(__file__).parent / "dist"

LIBS = [
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
    "https://unpkg.com/lenis@1.1.13/dist/lenis.min.js",
]

FOOD = {"beef": 0x8A3B2C, "tofu": 0xF2E6C8, "green": 0x5F8A2A, "greenLight": 0xB9CF7A,
        "chilli": 0xD7261E, "pepper": 0x4A1B12, "noodle": 0xF0DCA8, "herb": 0x4F7F2A}

VARIANTS = {
    "a": {
        "title": "3 Kingdoms Broadside 3D",
        "flag": "Variant A · Broadside 3D",
        "skin": "skin-a.css",
        "fonts": "family=Big+Shoulders+Display:wght@900&family=Zilla+Slab:wght@400;600;700",
        "cjk": "ZCOOL+QingKe+HuangYou",
        "bowl": {"style": "ink", "bowlColor": 0x1C1A17, "rimColor": 0xD7261E, "inkColor": 0x1C1A17,
                 "steamColor": 0xFBFAF7, "food": FOOD},
    },
    "b": {
        "title": "3 Kingdoms Reference Look",
        "flag": "Variant B · Reference look",
        "skin": "skin-b.css",
        "fonts": "family=Hanken+Grotesk:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500",
        "cjk": "Noto+Serif+SC:wght@400;500",
        "bowl": {"style": "gloss", "bowlColor": 0x17110F, "rimColor": 0xCF1B2B, "steamColor": 0xD8CCC7, "food": FOOD},
    },
}


def module_js(cfg):
    bowl = (SRC / "bowl3d.js").read_text().replace("export function initBowl", "function initBowl")
    page = (SRC / "page.js").read_text()
    page = re.sub(r"^import .*?;\n", "", page, flags=re.M).replace("export function boot", "function boot")
    return f"{bowl}\n{page}\nboot({{ bowl: {json.dumps(cfg)} }});\n"


def build(key, v):
    body = (SRC / "body.html").read_text().replace("{{VARIANT}}", v["flag"])
    cjk = "".join(sorted({c for c in body if "一" <= c <= "鿿"}))
    css = (SRC / "base.css").read_text() + "\n" + (SRC / v["skin"]).read_text()
    head = [
        f"<title>{v['title']}</title>",
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        f'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?{v["fonts"]}&display=swap">',
        f'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family={v["cjk"]}&display=swap&text={urllib.parse.quote(cjk)}">',
        f"<style>\n{css}\n</style>",
    ]
    scripts = "".join(f'<script src="{u}"></script>\n' for u in LIBS)
    html = "\n".join(head) + "\n" + body + "\n" + scripts + f'<script type="module">\n{module_js(v["bowl"])}</script>\n'
    DIST.mkdir(exist_ok=True)
    out = DIST / f"variant-{key}.html"
    out.write_text(html)
    print(out, len(html) // 1024, "KB", "cjk:", cjk)


for k, v in VARIANTS.items():
    build(k, v)
