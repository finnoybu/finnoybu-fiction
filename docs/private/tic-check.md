# Tic-check — automated grep blacklist

> **Purpose:** Mechanical check against the specific tic-pathology of the 267K-word rejected draft. Runs before any chapter or test paragraph is shown to Ken. Matches in Tier A block the gate; matches in Tier B trigger a density review; matches in Tier C log and inform future tuning.
> **Authority:** Ken 2026-04-21. Patterns derived from post-mortem of the prior draft's ritual cadence and from general AI-prose failure modes. Additions to this list should be committed whenever a new recurring pathology is caught in drafting.
> **Usage:** `bash docs/private/tic-check.sh <target.md>` — returns non-zero exit if any Tier A pattern matches. The script is regenerated from this document; edit here, not there.

---

## Tier A — hard ban (any match = rewrite before gate)

These shapes are specifically the prior draft's ritual-cadence DNA. They are NOT acceptable in any register. A single match fails the check.

| Pattern | Regex (ripgrep, `-P`) | Rationale |
|---|---|---|
| "small particular X" compound | `\bsmall particular\b` | The signature tic of the prior draft. Soft-adjective-stacked-before-noun is a ritual shape. |
| "particular small X" compound (reversed) | `\bparticular small\b` | Same shape, reversed. |
| "X was the X" tautology | `\b(\w+) was the \1\b` | Ritual tautology. Never rendered information; only rhythm. |
| "the X was the X" tautology (article variant) | `\bthe (\w+) was the \1\b` | Article-prefixed variant of the above. |
| "X was X" bare tautology | `\b(\w+) was \1\b` | Bare-tautology variant — added 2026-04-22 after Ken caught "the water was water" in Ch 2 which the article-required regex above had missed. |
| "the X was X" (article only on subject) | `\bthe (\w+) was \1\b` | Partial-article variant — same tautology, missed by both regexes above until this addition. |
| "did not, in X-ing, Y" interpolation | `did not, in \w+ing,` | Subordinate-gerund-between-commas as a breathing tic. |
| "could not, in X-ing, Y" interpolation | `could not, in \w+ing,` | Modal variant of the above. |
| Any compound of two softening-adjectives | `\b(small|slight|quiet|gentle|tender|delicate|fine|faint) (small|slight|quiet|gentle|tender|delicate|fine|faint)\b` | Hyper-softening adjective-stacking. Exception: instructional text in docs/ (not prose). |
| Three or more em-dashes in one sentence | `[.!?][^.!?—\n]*—[^—\n]*—[^—\n]*—` (approximate) | Two em-dashes form a legitimate aside; three is a nesting cascade. |

## Tier B — density check (flag if above threshold per 1000 words)

These patterns are legitimately usable in small doses but become tics when overused.

| Pattern | Regex | Per-1000-word threshold |
|---|---|---|
| ", without X-ing" subordinate | `, without \w+ing` | Max 2 per 1000 words |
| ", as if X" simile | `, as if ` | Max 4 per 1000 words |
| ", like X" simile | `, like ` | Max 5 per 1000 words |
| "something of" hedge | `\bsomething of\b` | Max 2 per 1000 words |
| "a kind of" hedge | `\ba kind of\b` | Max 2 per 1000 words |
| "seemed to" hedge | `\bseemed to\b` | Max 3 per 1000 words |
| "felt as if" hedge | `\bfelt as if\b` | Max 2 per 1000 words |
| "not X but Y" antithesis | `\bnot \w+(?: \w+)? but \w+` | Max 3 per 1000 words |
| Sentence-initial "And" | `(?m)^And\b` | Max 3 per 1000 words |
| Sentence-initial "But" | `(?m)^But\b` | Max 3 per 1000 words |

Density-check math: count matches, divide by word count, multiply by 1000.

## Tier C — watch list (log only)

Patterns that indicate possible drift but are commonly legitimate. Logged for longitudinal pattern-recognition across chapters; not blocking.

| Pattern | Regex | Notes |
|---|---|---|
| "in the X" abstract-spatial | `\bin the (small|large|great|narrow|wide)\b` | Sometimes legitimate (in the small hours, etc.); sometimes an AI-abstraction tic. |
| "X as X" same-word reduplication | `\b(\w+) as \1\b` | e.g. "silence as silence." Legitimate in specific rhetorical moves; flagged for review. |
| Three-item lists separated by commas | `\b\w+, \w+, \w+,? and \w+\b` | Three-beat rhythm legitimate; four-or-more in a paragraph drift-flag. |
| Present-perfect run in a past-tense narrative | `(?:\bhad \w+ed\b.*?){4,}` | Four past-perfects in close sequence without variety is a Tóibín-drift risk; may be legitimate for Olava. |

## Exemptions

- **This document itself is exempt** — patterns appear here as explanations, not as prose.
- **Instructional text in `docs/private/*.md`** is exempt. Only prose in `content/en/*.md` and draft test paragraphs get checked.
- **Quoted speech** (between `"` or `"` pairs) is NOT exempt — period-authentic dialogue still has to clear Tier A.
- **Dialogue tags** (`he said`, `she said`) are exempt from the antithesis and hedge density counts, because tag repetition is a separate stylistic choice.

---

## The check script

The script below runs all Tier A patterns and reports matches. It is the mechanical enforcement of this document.

```bash
#!/usr/bin/env bash
# tic-check.sh — tier A grep check
# Usage: bash docs/private/tic-check.sh <file.md>
# Exit: 0 = clean, 1 = Tier A match found

set -u
target="${1:-}"
if [[ -z "$target" || ! -f "$target" ]]; then
  echo "usage: bash docs/private/tic-check.sh <file.md>" >&2
  exit 2
fi

fail=0

run_check() {
  local label="$1"
  local pattern="$2"
  local matches
  matches=$(rg -nP "$pattern" "$target" || true)
  if [[ -n "$matches" ]]; then
    echo "FAIL [$label]:"
    echo "$matches"
    echo
    fail=1
  fi
}

run_check "small particular"         '\bsmall particular\b'
run_check "particular small"         '\bparticular small\b'
run_check "X was the X tautology"    '\b(\w+) was the \1\b'
run_check "the X was the X tautology" '\bthe (\w+) was the \1\b'
run_check "X was X bare tautology"   '\b(\w+) was \1\b'
run_check "the X was X tautology"    '\bthe (\w+) was \1\b'
run_check "did not, in X-ing,"       'did not, in \w+ing,'
run_check "could not, in X-ing,"     'could not, in \w+ing,'
run_check "softening-adjective pair" '\b(small|slight|quiet|gentle|tender|delicate|fine|faint) (small|slight|quiet|gentle|tender|delicate|fine|faint)\b'

# Em-dash cascade — three em-dashes in one sentence (no sentence-terminator between them)
dash_cascade=$(rg -nP '[—][^.!?\n]*[—][^.!?\n]*[—]' "$target" || true)
if [[ -n "$dash_cascade" ]]; then
  echo "FAIL [em-dash cascade (3+ in one sentence)]:"
  echo "$dash_cascade"
  echo
  fail=1
fi

if [[ $fail -eq 0 ]]; then
  echo "tic-check: clean"
fi
exit $fail
```

### To install

```bash
# One-time, from repo root:
mkdir -p scripts
# copy the script body above into scripts/tic-check.sh
chmod +x scripts/tic-check.sh
```

Then invoke as `bash scripts/tic-check.sh content/en/01-before-the-cast-off.md` (or whatever the chapter filename is) before showing any draft to Ken.

**This file is the source of truth for the script.** If a pattern is added to the Tier A table above, the script body must be updated to match. A pre-gate chapter check that ran against an outdated script would not actually verify what this document claims.

---

## How to use this in practice

1. Draft a chapter into `content/en/`.
2. Self-read once.
3. Run `bash scripts/tic-check.sh content/en/<chapter>.md`.
4. If Tier A matches appear, rewrite until clean.
5. Run the Tier B density checks manually (or extend the script) if the draft feels rhythm-heavy.
6. Only after a clean check, show the draft to Ken for gate-reading.

The Tier A check is the mechanical gate. Ken's reader-verdict is the real gate. Both must clear.

---

## Updating this document

When a new tic emerges in drafting that Ken catches in gate-reading:

1. Add the pattern to the appropriate tier table.
2. Update the script body to match.
3. Commit both changes in the same commit with a message referencing the tic and the chapter it was caught in.

The list will grow over the trilogy. Keeping it precise and current is the maintenance discipline.

---

## What this does NOT catch

- **Register drift** — whether a Haakon paragraph sounds like Haakon vs. drifted-toward-default-narrator. Caught by read-aloud, not grep.
- **Emotional falseness** — whether a scene's beat lands truly. Ken's ear.
- **Period-inauthentic idiom** — modern phrasing that grep doesn't know to flag. Ken's ear.
- **Plot / timeline errors** — memoir-digest cross-reference, not grep.
- **Register-specific overuse** — e.g., if Tóibín's past-perfect-density tips into parody. Partial catch via Tier C; real catch by Ken.

Grep is the floor of the discipline. Ken is the ceiling.
