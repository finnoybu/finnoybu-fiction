# Process Commitments — Trilogy Restart

**Status:** Locked. Ken 2026-04-21.

This document captures the guardrails and non-negotiable rules for the trilogy restart. Both Ken and Claude operate under these; they supersede any other convenience.

## The non-substitutable rule

**Ken must do the gate-reading. If Ken cannot, the project pauses. Claude does not draft chapters that won't be read.**

The gate reading is:
- Test paragraph (~5 min)
- Chapter 1 (~30 min)
- Chapter 2 (~30 min)
- Chapter 3 (~30 min)
- At each session boundary: scan `SESSION_STATE.md`, `flags.md`, `git log --oneline` (~15 min)

Total across the initial gate: ~90 min reading + ~15 min per-session audit.

If Ken's depression, exhaustion, or schedule makes this impossible in a given window, we pause. "Pause" is an honorable option, always. Drafting without the reader is how four prior AI attempts failed; we will not repeat that mistake.

## What Claude commits to

1. **No chapter drafting until a paragraph passes Ken's read.** Voice test first, always.
2. **No chapter shown to Ken until the tic-check grep is clean.** Specific bigram/trigram patterns catalogued in `tic-check.md` (to be built) — zero tolerance for any hit.
3. **Ken's verdict on prose is final. Claude does not argue with reader-experience.** If Ken says it reads like shit, it reads like shit. That is not deference; that is acknowledging that AI evaluations of AI prose systematically share the prose's blind spots.
4. **"Stop" means stop immediately.** No "let me finish this thought first." No "one more try."
5. **Claude is honest about drift.** Not just voice drift — scope creep, sunk-cost reasoning, anything noticed gets flagged proactively.
6. **Strategy is open to argument.** On non-prose questions (approach, scope, diagnosis, what-to-do-next), Claude pushes back when there's a reason. Reader-experience is authoritative; strategy is collaborative.
7. **Scope discipline — one chapter at a time.** No batch drafting. No jumping ahead in the agreed queue. If Claude finishes early, Claude stops and waits.
8. **No silent decisions.** Ambiguity in the memoir, architectural choices, anything that could be flagged → goes in `flags.md` with context, Ken decides when he reads.
9. **No memoir detail used unless cited.** Every sourced claim must trace to a specific passage. If Claude can't cite, Claude can't use.
10. **Every reference document change requires an explicit commit with rationale.** Ken can see diffs in git log.

## What Ken commits to

1. **Do the gate-reading.** Or say "pause" clearly.
2. **One-sentence verdicts are enough.** "This could be the book" or "No, too [one word]." No explanation owed.
3. **Three chapters is the gate.** Not "let me read five to be sure." Three chapters is enough signal either way.
4. **If hitting a wall — exhausted, bad depression day, can't read tonight — say "pause."** The work preserves. Nothing has to decide tonight.
5. **Tell Claude when sycophancy shows up.** The correction works.

## What the project commits to

Everything is git-committed and auditable. No silent changes. Every decision has a commit trail. Every reference doc is versioned.

## The gates

### Gate 0: Infrastructure
Before any prose:
- `docs/private/memoir-digest.md` (Claude builds, 2-3 hrs)
- `docs/private/trilogy-outline.md` (Claude builds, 1-2 hrs)
- Ken reviews both (~45 min)
- `docs/private/voice-target.md` (Claude builds, 2 hrs)
- `docs/private/tic-check.md` (Claude builds with committed bigram blacklist, 30 min)

### Gate 1: Test paragraph
Claude writes ONE paragraph in Olav-Miller register from a specific memoir event. Ken reads (~5 min). Verdict. If it doesn't pass, iterate; we do not proceed to a chapter until a paragraph passes.

### Gate 2: Chapter 1
Chapter 1 from the memoir (Olavus's first voyage on *Nanna*, summer 1875, age-shifted to 18). ~3000 words. Tic-check clean before Ken sees it. Ken reads (~30 min). Verdict.

### Gate 3: Chapters 2 and 3
Same protocol. Two more one-sentence verdicts. Three-chapter data lets both of us decide if this is working.

### After three-chapter pass
Proceed book-by-book. Chapter-by-chapter review. Stop condition: three consecutive chapters requiring substantial rework → reassess.

## The off-ramp

At any gate, Ken can say "archive" and we stop. The 267K-word v0 and all working memory sit preserved in git. The dream goes on the shelf; the decision doesn't die, it waits. This option is always available and is honorable. It is not failure.

## Change log

- 2026-04-21: Initial commitments locked at trilogy-restart decision point.
