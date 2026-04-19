"""
Build ePub for a Finnoybu trilogy book.

Assembles markdown chapters in order and runs Pandoc. Select which book to
build via the BOOK constant below. No illustrations are bundled at present
(cover art and interior illustrations are held until all three books are
drafted).

Usage: python build-epub.py
Requires: pandoc, pyyaml
"""

import os
import re
import subprocess
import yaml

# ---------------------------------------------------------------------------
# Select which book to build.
BOOK = 1
# ---------------------------------------------------------------------------

REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
IMAGES_DIR = os.path.join(REPO_ROOT, "public", "images")
OUTPUT_DIR = os.path.join(REPO_ROOT, "output")
AUTHOR = "E. A. Westbo"
LANGUAGE = "en"
PUBLISHER = "Finnoybu Press"
DATE = "2026"

BOOKS = {
    1: {
        "content_dir": os.path.join(REPO_ROOT, "content", "en"),
        "title": "Finnoybu: Salt and Silence",
        "output_file": "finnoybu-salt-and-silence.epub",
        "cover_image": "finnoybu-salt-and-silence-cover.jpg",
    },
    2: {
        "content_dir": os.path.join(REPO_ROOT, "content", "en", "book-2"),
        "title": "Finnoybu: The Monsoon Letter",
        "output_file": "finnoybu-the-monsoon-letter.epub",
        "cover_image": "finnoybu-the-monsoon-letter-cover.jpg",
    },
    3: {
        "content_dir": os.path.join(REPO_ROOT, "content", "en", "book-3"),
        "title": "Finnoybu: The Captain's Burden",
        "output_file": "finnoybu-the-captains-burden.epub",
        "cover_image": "finnoybu-the-captains-burden-cover.jpg",
    },
}


def load_chapters(content_dir):
    chapters = []
    for fname in os.listdir(content_dir):
        if not fname.endswith(".md"):
            continue
        fpath = os.path.join(content_dir, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            text = f.read()

        m = re.match(r"^---\n(.*?)\n---\s*", text, re.DOTALL)
        if not m:
            continue
        meta = yaml.safe_load(m.group(1))
        body = text[m.end():]

        chapters.append({
            "id": meta.get("id", 999),
            "title": meta.get("title", fname.replace(".md", "").replace("-", " ").title()),
            "slug": meta.get("slug", fname.replace(".md", "")),
            "body": body,
        })

    chapters.sort(key=lambda x: x["id"])
    return chapters


def build_combined_markdown(chapters):
    parts = []

    for ch in chapters:
        if ch["id"] == 0:
            heading = f"# {ch['title']}"
        else:
            heading = f"# Chapter {ch['id']}: {ch['title']}"

        body = ch["body"].strip()
        parts.append(f"{heading}\n\n{body}")

    return "\n\n\n".join(parts)


def write_metadata_yaml(path, title):
    meta = {
        "title": title,
        "creator": [
            {"role": "author", "text": AUTHOR},
        ],
        "publisher": PUBLISHER,
        "lang": LANGUAGE,
        "date": DATE,
        "rights": f"\u00a9 {DATE} {PUBLISHER}. All rights reserved.",
    }
    with open(path, "w", encoding="utf-8") as f:
        yaml.dump(meta, f, default_flow_style=False, allow_unicode=True)


def main():
    if BOOK not in BOOKS:
        print(f"ERROR: BOOK={BOOK} not in {list(BOOKS.keys())}")
        return

    cfg = BOOKS[BOOK]
    content_dir = cfg["content_dir"]
    title = cfg["title"]
    output_file = cfg["output_file"]
    cover_image = os.path.join(IMAGES_DIR, cfg["cover_image"])

    if not os.path.isdir(content_dir):
        print(f"ERROR: content directory does not exist: {content_dir}")
        return

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"Building Book {BOOK}: {title}")
    print(f"Loading chapters from {content_dir}...")
    chapters = load_chapters(content_dir)
    print(f"  Found {len(chapters)} chapters")

    if not chapters:
        print("  ERROR: no chapters found")
        return

    print("Assembling markdown...")
    combined = build_combined_markdown(chapters)

    combined_md_path = os.path.join(OUTPUT_DIR, f"book-{BOOK}-combined-epub.md")
    with open(combined_md_path, "w", encoding="utf-8") as f:
        f.write(combined)

    metadata_path = os.path.join(OUTPUT_DIR, f"book-{BOOK}-epub-metadata.yaml")
    write_metadata_yaml(metadata_path, title)

    output_path = os.path.join(OUTPUT_DIR, output_file)

    pandoc_cmd = [
        "pandoc",
        combined_md_path,
        "-o", output_path,
        "--from", "markdown",
        "--to", "epub3",
        "--toc",
        "--toc-depth=1",
        "--split-level=1",
        f"--metadata-file={metadata_path}",
        "--epub-chapter-level=1",
    ]

    if os.path.exists(cover_image):
        pandoc_cmd.append(f"--epub-cover-image={cover_image}")
        print(f"  Cover: {cover_image}")
    else:
        print(f"  No cover image at {cover_image} (ePub will have no cover)")

    print("Running Pandoc...")
    result = subprocess.run(pandoc_cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"  Pandoc STDERR: {result.stderr[:500]}")

    if os.path.exists(output_path):
        size_mb = os.path.getsize(output_path) / (1024 * 1024)
        print(f"  SUCCESS: {output_path} ({size_mb:.1f} MB)")
    else:
        print("  ERROR: ePub not created")


if __name__ == "__main__":
    main()
