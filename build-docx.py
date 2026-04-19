"""
Build DOCX for a Finnoybu trilogy book.

Assembles markdown chapters in order, strips frontmatter, adds chapter headings,
and runs Pandoc. Select which book to build via the BOOK constant below.

Usage: python build-docx.py
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
OUTPUT_DIR = os.path.join(REPO_ROOT, "output")
AUTHOR = "E. A. Westbo"

BOOKS = {
    1: {
        "content_dir": os.path.join(REPO_ROOT, "content", "en"),
        "title": "Finnoybu: Salt and Silence",
        "output_file": "finnoybu-salt-and-silence.docx",
    },
    2: {
        "content_dir": os.path.join(REPO_ROOT, "content", "en", "book-2"),
        "title": "Finnoybu: The Monsoon Letter",
        "output_file": "finnoybu-the-monsoon-letter.docx",
    },
    3: {
        "content_dir": os.path.join(REPO_ROOT, "content", "en", "book-3"),
        "title": "Finnoybu: The Captain's Burden",
        "output_file": "finnoybu-the-captains-burden.docx",
    },
}


def load_chapters(content_dir):
    """Load and sort all chapters by their frontmatter id."""
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
            "body": body,
            "fname": fname,
        })

    chapters.sort(key=lambda x: x["id"])
    return chapters


def strip_image_references(text):
    """Replace any residual markdown image references with bracketed notes."""
    def replace_img(m):
        alt = m.group(1) or "Illustration"
        return f"\n\n*[Image: {alt}]*\n\n"
    text = re.sub(r"!\[([^\]]*)\]\([^)]+\)", replace_img, text)
    text = re.sub(r'<img[^>]*alt="([^"]*)"[^>]*/?>',
                  lambda m: f"\n\n*[Image: {m.group(1)}]*\n\n", text)
    text = re.sub(r'<img[^>]*/?>', "\n\n*[Image]*\n\n", text)
    return text


def build_combined_markdown(chapters):
    """Combine all chapters into a single markdown string."""
    parts = []

    for ch in chapters:
        if ch["id"] == 0:
            heading = f"# {ch['title']}"
        else:
            heading = f"# Chapter {ch['id']}: {ch['title']}"

        body = strip_image_references(ch["body"].strip())
        parts.append(f"{heading}\n\n{body}")

    return "\n\n\\newpage\n\n".join(parts)


def main():
    if BOOK not in BOOKS:
        print(f"ERROR: BOOK={BOOK} not in {list(BOOKS.keys())}")
        return

    cfg = BOOKS[BOOK]
    content_dir = cfg["content_dir"]
    title = cfg["title"]
    output_file = cfg["output_file"]

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

    combined_md_path = os.path.join(OUTPUT_DIR, f"book-{BOOK}-combined.md")
    with open(combined_md_path, "w", encoding="utf-8") as f:
        f.write(combined)
    print(f"  Written to {combined_md_path}")

    output_path = os.path.join(OUTPUT_DIR, output_file)

    pandoc_cmd = [
        "pandoc",
        combined_md_path,
        "-o", output_path,
        "--from", "markdown",
        "--to", "docx",
        "--toc",
        "--toc-depth=1",
        "--standalone",
        f"--metadata=title:{title}",
        f"--metadata=author:{AUTHOR}",
    ]

    print("Running Pandoc...")
    result = subprocess.run(pandoc_cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"  Pandoc STDERR: {result.stderr[:500]}")

    if os.path.exists(output_path):
        size_kb = os.path.getsize(output_path) / 1024
        print(f"  SUCCESS: {output_path} ({size_kb:.0f} KB)")
    else:
        print("  ERROR: DOCX not created")


if __name__ == "__main__":
    main()
