# CLAUDE.md — finnoybu-fiction

## What this repo is
A Next.js 14 reader site for **Finnoybu** — a queer period historical romance trilogy by pseudonymous author **E. A. Westbo** (Kenneth Tannenbaum). Lives at `fiction.finnoybu.com`. Cloned from [sea-reader](../sea-reader/) infrastructure; intentionally lean on governance (no charter, no master index, no docs/ stack).

**Reimagines** the memoir of Olavus Vullum Bjørnson Vestbø (Ken's great-great-grandfather, published in sea-reader) as commercial historical romance in the Outlander / Fourth Wing / Song of Achilles crossover tier. Note: *Olavus* is the ancestor's real name; *Olav* (one letter shorter) is the trilogy's fictional protagonist — the name shift is intentional and preserves the ancestor's identity while letting the fiction be fiction.

## What the book is
- **Protagonist:** Olav Hestby (surname carries inland-farm resonance — thematic dissonance with the sea; see [docs/private/names-index.md](docs/private/names-index.md)), a young Norwegian sailor. Story opens at **age 18** on his first voyage out of Stavanger as cook on the brig *Nanna* (working name — to be renamed; see Ships in [docs/private/names-index.md](docs/private/names-index.md)), summer 1875.
- **Olav's interior arc:** Olav leaves home with no language, concept, or awareness that he might be multisexual. His discovery of his own desire — first recognized as a private, unnamed attention to certain men; later as something he cannot translate into any word his culture gives him; finally as something he learns to carry rather than resolve — is the trilogy's hidden spine. At eighteen he knows only that he loves Olava; by twenty-four, on his wedding day, he knows differently, and he is choosing both.
- **Central tension:** A girl at home (Olava; becomes his wife) *and* the encounters he cannot name with men at sea and in ports. By the time he understands what he is, he genuinely loves both. In an era with no word for it.
- **Trilogy** (book division locked 2026-04-21; structural contract in [docs/private/trilogy-outline.md](docs/private/trilogy-outline.md)):
  - **Finnoybu: Salt and Silence** — Book I: 1875 – Christmas 1877, ages 18 → ~20. First voyages (*Nanna* cook, *Faina* under a tyrant captain), meeting Olava at Landa summer 1876, the long *Dronningen* (memoir *Hjemmet*) voyage (Archangel, Atlantic, Jamaica), the Wilmington desertion, and the O'Brien Irish-Catholic family's winter nursing. Closes on the *Cito* leaving Wilmington Christmas 1877.
  - **Finnoybu: *[TBD]*** — Book II: Christmas 1877 – autumn 1879, ages 20 → 22. *Cito* floating-coffin Atlantic crossing, the New York slaveship, Bordeaux, homecoming to Olava, navigation school, the tuberculosis scare, the *Allegro* disaster, and the *Diana* healing journey home. The most interior of the three books.
  - **Finnoybu: *[TBD]*** — Book III: autumn 1879 – January 22, 1882, ages 22 → 24. The *Semiramis* East India voyage, the Baltic hurricane winter on *Olivier*, *Favorit* Cuba (the oil-painted portrait of Olava), *President Daae* with the Swedish encounter and the silent cutoff, and the wedding.
- **Narration:** multi-POV third-person limited with per-POV voice registers locked in [docs/private/voice-register.md](docs/private/voice-register.md) — Olav/Miller, Olava/Tóibín, Haakon/Proulx, Jens/Robinson, Sven Haugen/Proulx, Thoresen/Hemingway-aside.
- **Heat level:** Outlander tier at emotional peaks; Song-of-Achilles restraint between.
- **Length target:** 360–440 pages per book at literary-fiction density (~275–300 words/page, benchmarked against *Song of Achilles*). Working word-count targets ~115K / ~105K / ~125K.

## Hard rules for Claude working here
- **The manuscript is fiction I write.** Unlike sea-reader, automated prose generation is the product — write freely into [content/](content/).
- **The ancestor's memoir is sacred source, not a script.** Use it as scaffolding for plot, geography, period detail. Do not lift sea-reader's manuscript body text verbatim into this project.
- **Working names vs. final names:** All named human characters **and all named ships** track in [docs/private/names-index.md](docs/private/names-index.md). Ship-rename policy locked 2026-04-21 — all named vessels become fictional names to break 1:1 recognizability against the memoir. When uncertain about a name, use the memoir's real name and flag it there; final names get chosen with Ken before the name appears in drafted chapter text.
- **docs/private/** holds plan-of-record documents. Before writing chapters, read: [docs/private/trilogy-outline.md](docs/private/trilogy-outline.md) (structural contract), [docs/private/voice-register.md](docs/private/voice-register.md) (per-POV register mapping), [docs/private/memoir-digest.md](docs/private/memoir-digest.md) (sourced-from-memoir reference), and [docs/private/SESSION_STATE.md](docs/private/SESSION_STATE.md) (queue position). The legacy [trilogy-plan.md](docs/private/trilogy-plan.md) and related pre-restart docs are superseded and retained for archaeology only.
- **Behavioral discipline** (inherited from AEGIS principles, not the repo's own governance): conventional commits, feature branches, PR flow, signed commits, squash merge, linear history, no force-push.

## Layout
- [app/](app/) — Next.js routes (cloned from sea-reader; auth/shop/legal intact but latent without env vars).
- [components/](components/) — reader shell, chapter UI, auth modals, etc.
- [lib/chapters.ts](lib/chapters.ts) — loads markdown from `content/en/`, sorts by frontmatter `id`.
- [content/en/](content/en/) — the novel. Each file is a chapter with frontmatter `id` (numeric, sort key), `title`, `slug`, `hero.image`.
- [docs/private/](docs/private/) — plan-of-record (not user-facing).
- [schemas/](schemas/) — frontmatter schema (inherited from sea-reader).

## Commands
- `pnpm dev` — local Next dev server
- `pnpm build` / `pnpm start`
- `pnpm lint` / `pnpm typecheck`

Node 24.x, pnpm 9.

## Related
- Sibling project: [sea-reader](../sea-reader/) — the ancestor's actual memoir, non-fiction, protected manuscript.
- Owner: Finnoybu (Kenneth Tannenbaum).
