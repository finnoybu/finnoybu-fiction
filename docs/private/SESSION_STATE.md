# Session State — Trilogy Restart

**Last updated:** 2026-04-21 — memoir digest complete; book division locked.

## Where we are

Trilogy restart decided and locked. All prior 267K-word work committed at `07620d9` for permanent recoverability. Voice-register design committed at `73597db`. Process commitments committed. Memoir digest written and committed at `160eb70`.

## Book division — LOCKED 2026-04-21

Natural memoir pivots aligned with three-book structure:

- **Book I: 1875–1877** — Olav ages 18 → ~20. *Nanna* (first voyage, cook), *Faina* (Capt G.K. tyrant, rotten food, Eliasson's death, Lisbon slaughter-attempt), meeting Olava at Landa (Finnøy, June 1876), *Hjemmet* with kind Capt Tollefson (Archangel, Atlantic hurricane, Jamaica logwood), proposal-by-letter, acceptance at Cape Verde, Wilmington desertion + O'Brien Catholic-Irish family nursing winter 1877 (Mary Ellen/Margit tenderness). Book I ends on the floating-coffin *Cito* departing Wilmington Christmas 1877.
- **Book II: 1877–1879** — Olav ages 20 → 22. *Cito* floating-coffin crossing (6 weeks pumping, mid-Atlantic prayer at anchor windlass), NY slaveship half-voyage + brotherhood half-voyage, Bordeaux ("twin dudes"), homecoming-to-Olava midsummer 1878 (she's 19 and fully grown), meeting her family at Roalsøy, navigation school 1878–79, tuberculosis scare, April 1879 exam pass, fishing trip with Peder, *Allegro* disaster (Vardøy, tight-fist captain), *Diana*/Capt Sars healing journey. Book II ends on return to Stavanger September 1879 with 200 kroner, full health restored, ready for the great voyage.
- **Book III: 1879–1881** — Olav ages 22 → 24. *Semiramis* East India voyage (Flensberg → Shields → Rangoon → 1-year return via Cape of Good Hope, Sunday strike, Capt Hamre's pride, Verdensposten letter, equator ritual), *Olivier* Baltic hurricane winter 1880 (Skagen-light 120-ships-wrecked night), *Favorit* Cuba (Boston oil-painting of Olava, Florida Water present, alarm-clock panic), *President Daae* with Capt Thoresen (the Swedish lady meeting / letters / silent cutoff — central emotional crisis), marriage January 22, 1882. Book III ends on the wedding.

**Age-shift arithmetic:** memoir Olavus born early 1860 → fictional Olav born early 1857. +3 shift applied uniformly. Memoir dates = fiction dates (the world is still 1875–1882).

**Emotional-mirror (from voice-register.md) still applies cleanly:**
- Haakon: joy in Book I → grief in Book III.
- Olava: grief in Book II → joy in Book III.
- Swedish-lady episode from memoir Ch 58–67 (Aug–Nov 1881) sits at the Book III emotional apex.

**Departure from old plan:** The pre-restart CLAUDE.md (current) says Book II = East India voyage. Under the locked 2026-04-21 division, East India moves to Book III. CLAUDE.md per-book descriptions to be updated after Ken reviews the trilogy-outline.

## The project in one paragraph

Ken's great-great-grandfather Olavus Vullum Bjørnson Vestbø's memoir (*A Sailor's Reminiscences from the Days of the Sailships*, at `d:/dev/sea-reader/`) is being novelized into a three-book queer literary historical coming-of-age trilogy with +3 age shift (Olavus 15 on *Nanna* 1875 → Olav 18 on *Nanna* 1875). Target register: Madeline Miller (*Song of Achilles*) — literary-commercial crossover, reserved physicality, body-noticing queer-awakening. Multi-register POV: Olav/Miller + Olava/Tóibín + Haakon/Proulx + Jens/Robinson + Sven/Proulx + Thoresen/Hemingway-short-aside. Emotional-mirror structural spine: Haakon joy (I) → grief (III); Olava grief (II) → joy (III).

## The project in one paragraph

Ken's great-great-grandfather Olavus Vullum Bjørnson Vestbø's memoir (*A Sailor's Reminiscences from the Days of the Sailships*, published at `d:/dev/memoirs/`) is being novelized into a three-book queer literary historical coming-of-age trilogy with +3 age shift (Olavus 15 on *Nanna* 1875 → Olav 18 on *Nanna* 1875). Target register: Madeline Miller (*Song of Achilles*) — literary-commercial crossover, reserved physicality, body-noticing queer-awakening. Multi-register POV: Olav/Miller + Olava/Tóibín + Haakon/Proulx + Jens/Robinson + Sven/Proulx + Thoresen/Hemingway-short-aside. Emotional-mirror structural spine: Haakon joy (I) → grief (III); Olava grief (II) → joy (III).

## Immediate next action

**Build `docs/private/trilogy-outline.md`** — map memoir events across the three books (per locked 2026-04-21 division above), with per-chapter allocation marking sourced-from-memoir vs. invented. Claude solo work, no Ken input during drafting, commit as single artifact.

## Queue

1. ~~`docs/private/memoir-digest.md`~~ — **DONE** (commit `160eb70` 2026-04-21).
2. `docs/private/trilogy-outline.md` — IN PROGRESS.
3. **Ken reviews digest + outline** — ~45 min his time, confirms memoir facts, confirms outline structure, flags anything off. Then update CLAUDE.md per-book age ranges to match locked division.
4. `docs/private/voice-target.md` — 2–3 sample paragraphs per POV register (Miller, Tóibín, Proulx, Robinson, Hemingway) as drafting reference. 2 hours Claude.
5. `docs/private/tic-check.md` — committed bigram/trigram blacklist for automated pre-Ken greps. 30 min.
6. **Test paragraph** — Claude writes one paragraph in Olav-Miller register. Ken reads ~5 min. Verdict.
7. **Chapter 1** — from memoir, age-shifted. ~3000 words. Tic-check clean before showing. Ken reads ~30 min. Verdict.
8. If Ch 1 passes: **Chapter 2 and Chapter 3** gates.
9. If all three pass: proceed book-by-book.

## Committed this session (git log)

```
73597db docs: update voice-register with emotional-mirror structure
dd14db3 docs: lock per-POV voice register mapping for trilogy restart
07620d9 wip: preserve current trilogy state across all three books
```

Plus this session's remaining commits for process-commitments.md and this SESSION_STATE.md (pending).

## Reference documents (in order of relevance to next session's work)

1. **`docs/private/voice-register.md`** — LOCKED canonical voice design. Read before any drafting.
2. **`docs/private/process-commitments.md`** — LOCKED guardrails. Read to confirm protocol.
3. **This file (`SESSION_STATE.md`)** — where we are in the queue.
4. **`d:/dev/sea-reader/content/en/`** — source memoir (read-only). Read to build the digest. Combined renders in `d:/dev/sea-reader/output/`.
5. **`docs/private/trilogy-plan.md`** — OLD plan-of-record. Partly stale; some architectural decisions (drawer motif, not-asking marriage form, Hestby church theme, Haakon as first love, Thomas Engelstad as disappeared-name, Captain Thoresen arc, Anders Copenhagen) may still be useful inputs to the new outline. Use as reference, not authority.
6. **`docs/private/expansion-canon-map.md`**, **`book-1-expansion-proposal.md`**, **`in-progress.md`**, **`drift-notes.md`**, **`books-2-3-outline.md`** — all OLD pre-restart documents. Superseded by restart decision. Use for archaeology only.

## Emotional context to carry into next session

Ken has depression. He was ready to delete the entire trilogy earlier tonight. He changed his mind when Claude pushed back honestly and when Ken himself articulated the memoir-as-source framing. He has committed to one more try with extraordinary protection mechanisms. A failed Ch 1 lands heavy on him. Claude committed to: no flattery, honest pushback when warranted, respect for Ken's reader-verdict as authoritative, no sycophancy.

Ken is the author, the reader, and Claude's peer. Not a user, not a supervisor. Peer.

## Open flags / decisions pending

None. All decisions at end-of-session locked. Next session opens with memoir-digest drafting.

## Unfinished items from this session

- `docs/private/tic-check.md` not yet built (will come in Gate 0 Phase 4)
- `docs/private/memoir-digest.md` not yet built (next action)
- `docs/private/trilogy-outline.md` not yet built (follows digest)
- `docs/private/voice-target.md` not yet built (follows outline review)
- `docs/private/flags.md` not yet built (will be created when Claude encounters first flaggable decision)
