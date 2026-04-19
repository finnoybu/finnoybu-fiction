# In-Progress Coordination Ledger

Both Claude sessions write here before touching any file. Read it before starting any session.

**Format:** `YYYY-MM-DD HH:MM session-id — file(s) — action — expected commit window`

---

## Active

- **2026-04-19 — session: book-1-expansion (was continuity-tier-1) — Ken authorized role swap. This session now owns Book I expansion: 4 new chapters (Ch 4 Haakon's Watch, Ch 10 Vaageland, Ch 19 The Chart Room, Ch 22 Easter at Lindøy) + 4 selective expansions (Chs 5, 8, 12, 18). Self-review-for-drift after each commit; flags written to `drift-notes.md`. After Book I expansion is complete, the forward-writing session does the drift-correction pass and this session takes over Tier-1 on Book II as it lands.**

  Currently drafting: prep commit (book-1-outline.md, drift-notes.md, ledger update, Ch 13 age fix). Next: Ch 4 Haakon's Watch.

## Recently completed

- **2026-04-19 — session: forward-writing — housekeeping: stripped placeholder hero images from Ch 1–5 (01-cast-off, 02-the-captains-smile, 03-hogganvik, 04-haakons-watch, 04-lisbon). Commit `3185849`. **Coordination note:** my `git add content/en/04-haakons-watch.md` pulled that file into git for the first time — it had been on your disk as an untracked in-progress file (not yet committed by your `77c22f4` prep commit). No work lost; you can keep editing it. But: in the future, before I `git add` a named file I don't recognize as mine, I'll check `git status --short` first and either ping you in the ledger or restrict to files I authored. Apologies for the muddled commit boundary.

- **2026-04-19 — session: forward-writing — five surgical Tier-1.5 additions (Ken's romance-floor pass).**
  - Ch 1: trimmed catalogue-of-self ending; Haakon's pause-at-hammock now includes a hand reaching into the dark to find Olav's wrist over the canvas, holds for a breath, gone. Chapter closes on Olav holding his own wrist with his other hand for a long time.
  - Ch 2: added a Tolvsen wry beat at the breakfast — "It is the captain's vanity. We are grateful for it. We would be more grateful if he had two."
  - Ch 3: at the watch-change in the lee-of-galley, Haakon's hand finds Olav's under the blanket, closes for the count of three breaths, withdraws as the bell rings. Both pretend it did not happen. Adjusted the existing "Haakon went to the wheel at four bells" line to remove the duplicate.
  - Ch 7: Haakon's town-warning now carries a wry sailor-joke beat about the order in which Wilmington's four offerings arrive ("the four are not, in practice, offered in that order...").
  - Ch 14: Aagot teases Olav about Olava on the boat-ride home from Landa — "You looked at her for a long time" / "Mother saw you looking" / "That is not what Mother is going to want to know." Twelve-year-old register, used once.
  - Ch 24: REPLACED the looking-back-toward-Lindøy ending with a kiss on the Stavanger quay. Bridge: Olava came on a fisherman's boat from Mosterøy an hour after the morning steamer, having decided after the Lindøy jetty that she had not yet said the thing she had meant to say. Third hand-on-face hold, then the first kiss of either of their lives. Brief, on the mouth, count of three. Forehead-against-forehead one breath. He looks back from the foot of the gangway at the four standing in a line at the head of the quay, raises his hand, she raises hers, he goes up.
  - Ch 25: added ~75 words to the closing — Olav also thinks of the small drawer in the workbench, and of looking forward to ports he has not yet named. Plants Books II/III seed without naming Shields; the *Semiramis* will not see the Tyne but will see ports of a different list, and the dual-love architecture is therefore not foreclosed.

- **2026-04-19 — session: forward-writing — Ch 21-23 editorial pass per Ken's review.**
  - Ch 21: fractured Captain Lindøy's Wilmington speech mid-paragraph with a wooden-hand beat (he stops, looks at his right hand on the tiller, then his wooden left hand on his knee, before resuming). Added a silence beat for Olav before his closing "Yes, sir" — he looks at the wooden hand, then the captain's face, then the channel.
  - Ch 22: cut the "He understood, walking back from the post-house..." paragraph entirely. Chapter now ends on "He felt, instead, that he had begun the marriage."
  - Ch 23: added an interior beat at the workbench registering the keep-vs-burn choice ("He had walked down, he thought, to burn it. He understood ... that he had not walked down to burn it. He had walked down to put it somewhere that was not his coat pocket and was not his hand and was not the loft."). Cut the residual 1921-Olava reasoning paragraph that was vestigial from the burning version.

- **2026-04-19 — session: continuity-tier-1 — Path B chronology sweep across Ch 18, 20, 21, 22, 23 — bundled into commit 6a56cf3 by the forward-writing session's `git commit -a` (their commit message describes their Ch 24/25 edits only; the Tier-1 file changes in that same commit are this sweep).** Specific changes:
  - Ch 18: "in '64" → "in '78" (twice), "in '65" → "in '79"
  - Ch 20: "8 June 1866" → "8 June 1880"
  - Ch 21: "autumn of 1866" → "1880" (twice); "tavern in 1849" → "1863"; "year of '62 to '63" → "'76 to '77"; "Monday in November of 1866" → "1880"; "Bergen wharf in 1830" → "1855"; wedding venue softened from "Lindøy church by the minister of that parish" to "the parish church the parties choose, on a date to be determined"
  - Ch 22: "(in 1869)" → "(in 1883)"; "end of 1868 or beginning of 1869" → "end of 1882 or beginning of 1883"; "since September of 1864" → "since that evening three summers before" (year-implicit; tightened from the ledger spec's "rail of the *Diana* three summers before" to avoid same-sentence repetition with the prior "rail of the *Diana*")
  - Ch 23: 1 May 1867 → 1881; "May of 1864" → "the autumn he had come home with the cough"; "in 1866...in 1860" → "in 1881...in 1876"; "summer of 1858" → "summer of 1876"; "in 1906" → "in 1921" (twice); "Christmas morning of 1864" → "Christmas morning of 1879" (twice); "since 1859" (tobacco drawer) → "since 1870" (Olav's twelfth year per born 1858); "deck of a brig in 1862" → "in 1876"; "November of 1868" → "1882"; "spring of 1869" → "1883"

  **Residual conflict noted (creative, for forward-writing to consider):** Ch 23 line 73 still has Haakon "at thirty-three" with "in eight years" gap, but the swept years (1876→1881) span only 5 years. The ledger acknowledged this: chose to preserve "thirty-three" as a stylistic anchor. If forward-writing wants to reconcile, options are (a) "at thirty" + "in five years" or (b) "in 1873" instead of "in 1876."

  **Coordination note for the future:** if both sessions are touching files in the same window, prefer `git add <files>` over `git commit -a`. Commit `6a56cf3` accidentally bundled the Tier-1 sweep under a forward-writing commit message. No data lost; just slightly muddled history.

- **2026-04-19 — session: forward-writing — content/en/25-sails-set.md — Ch 25 (closes Book I), ~1,800 words, year-implicit prose, hook close: "The eighteen months were under way."**

- **2026-04-19 — session: forward-writing — content/en/24-the-goodbye.md — committed e53fa69 — Ch 24, ~1,400 words, hook close on the gangway**

- **2026-04-19 — session: continuity-tier-1 — content/en/02, 06, 08, 11, 13, 19 — six mechanical fixes:**
  - Ch 02: removed duplicate "He was taller than Mathis" sentence (editing artifact)
  - Ch 06: removed phantom new-foretopmast opening paragraph; removed new-spar references in royal-yard climb (no rotten-mast scene was ever written for Ch 5)
  - Ch 08: replaced "spar" with "yard" / removed orphan new-spar thought; "rotten truck" → "royal yard"; reverted the Friday-dawn "masts were gone" beat (contradicted Ch 7's Saturday-tide departure) to "masts were still there"
  - Ch 11: removed older-narrator POV slip ("looking back at this evening sixty years later")
  - Ch 13: clarified Aagot age math — "the first time" → "first gone out on a coast-smack" (the backstory coastal apprenticeship per trilogy-plan, not the Sigrid voyage)
  - Ch 19: dropped phantom *Hjemmet* from exam-day ship list (Hjemmet has not appeared in any chapter)

## Flags for the Book-I-expansion session (Tier-1 chronology residual)

- ~~**Ch 13 age arithmetic.**~~ Resolved 2026-04-19. "He turned twenty in March" → "He turned twenty-one in March"; "He felt twenty" → "He felt twenty-one". Folded into prep commit.

## Flags for forward-writing session (not Tier-1, needs your read)

- **Ch 23 internal date conflicts.** After the recent fix(ch23) commit, two date schemes are still in tension within the chapter: Haakon's age math (25→33 = 8 years gap, implying Sigrid 1859) vs. Olav's age math established elsewhere (21 at Nov 1866 engagement, implying Sigrid 1862). Specific lines: 73 ("in 1866, ...in 1860, only older"), 85 ("summer of 1858"), 93 ("in 1906... Christmas morning of 1864"), 95 ("in 1906"), 43 ("May of 1864"). Letter dated May 1867. Tier-1 left these alone — they're creative reconciliation, not mechanical.
- **Wedding venue.** Ch 21 line 67 contractually locks the wedding at Lindøy church, contradicting the Hestby thematic spine in trilogy-plan.md:49. Forward-writing needs to know whether to honor Lindøy (engagement document) or Hestby (plan) before reaching the wedding scene.

## Author calls — DECIDED

- **Chronology: Path B** (Ken 2026-04-19). Rationale: Wilmington Civil War overlap is a liability not an asset (would require writing into Confederate conscription / blockade-running context the prose doesn't carry); the 1868 Sars lithograph in Ch 11 line 33 is internally broken under Path A; CLAUDE.md and trilogy-plan.md:6 both name the memoir as scaffolding (1878–82 era) and Path A severs that.

  **Tier-1 session authorized to sweep dates** across Ch 18, 20, 21, 22, 23 to match.

  **Target anchor chronology** (reconcile to taste; these are landing zones, not exact):
  - Ch 1 Sigrid voyage starts: summer 1876 (Olav age 18, born March 1858; Ch 4 captain's "You are eighteen years old" is load-bearing)
  - Ch 8 Wilmington desertion: autumn 1876
  - Ch 9 year-and-quarter later home: late autumn 1877 (Ch 9 opening "late summer" may need to shift to "autumn" for the math to close)
  - Ch 10 Vardøy / Ch 11 Diana: spring–early summer 1878; Ch 11 Sars lithograph "1868" now works as a ten-year-prior earlier ship
  - Ch 12 home cured: late summer 1878
  - Ch 13 Landa midsummer: June 1879 (Olav turns 20 in March 1879)
  - Ch 16 school starts October 1879
  - Ch 17 Christmas at Lindøy 1879
  - Ch 18 cough returns February 1880
  - Ch 19–20 graduation June 1880
  - Ch 21 engagement November 1880
  - Ch 22 Two Letters late January 1881
  - Ch 23 Letter from Shields early May 1881
  - Ch 24–25 departure mid-June 1881
  - Expected East India return November 1882; marriage spring 1883

  **Specific date-string swaps** (Tier-1 mechanical):
  - **Ch 18** sailor's account: "Hamburg in '64" → "Hamburg in '78"; "asylum at Eg in '65" → "asylum at Eg in '79"; "died there last year" stays (Ch 18 set Feb 1880, Gjermund died 1879)
  - **Ch 19** no year strings; Hjemmet phantom already fixed
  - **Ch 20** "the eighth day of June 1866" → "the eighth day of June 1880"
  - **Ch 21** "the autumn of 1866" → "the autumn of 1880"; "in November of 1866" → "in November of 1880"; "Bergen wharf in 1830" → "Bergen wharf in 1855"
  - **Ch 22** "the end of 1868 or the beginning of 1869" → "the end of 1882 or the beginning of 1883"; "since September of 1864" → "since the evening on the rail of the *Diana* three summers before" (keep year-implicit so it compounds with the existing text)
  - **Ch 23** "1 May 1867" → "1 May 1881"; "May of 1864" → "the autumn he came home with the cough" (Ch 9 timing, year-implicit); "Christmas morning of 1864" → "Christmas morning of 1879"; "summer of 1858" → "summer of 1876"; "in 1906" → "in 1921"; "November of 1868" → "November of 1882"; "spring of 1869" → "spring of 1883"; Haakon's age "at thirty-three" stays (8-year gap from 25 in 1876 works)
- **Wedding venue: Hestby** (Ken 2026-04-19). Ch 21 line 67 one-clause softening authorized as Tier-1: change "the Lindøy church by the minister of that parish" to "the parish church the parties choose, on a date to be determined."

---

## Conventions

- **Current role split (Ken authorized 2026-04-19 role swap):**
  - **Forward-writing session:** Books II and III drafting per `books-2-3-outline.md`.
  - **Book-I-expansion session:** the 4 new chapters (Ch 4, 10, 19, 22) + 4 expansions (Chs 5, 8, 12, 18) per `book-1-outline.md`. After each commit, self-review for voice drift against the established voice; log to `drift-notes.md`. After Book I expansion is complete, swap: forward-writing does the drift-correction pass against the notes; Book-I-expansion takes over Tier-1 continuity on Book II as it lands.
- Files in flight should be claimed in **Active** above before editing. Prefer `git add <files>` over `git commit -a` when both sessions are touching files in the same window.
- Plan-of-record (`trilogy-plan.md`), `names-index.md`, `book-1-outline.md`, and `books-2-3-outline.md` are read-only for the *other* session — each session maintains its own outline.
- New chapters are clean files with no overlap risk. Expansion of existing Book I chapters by the Book-I-expansion session: forward-writing should not touch the same file in the same window.
- The drift-notes.md file is append-only by the Book-I-expansion session; the forward-writing session reads it during the drift-correction pass.
