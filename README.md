# finnoybu-fantasy

**The Westbo Voyages** — a queer period historical romance trilogy by E. A. Westbo.

Lives at [fiction.finnoybu.com](https://fiction.finnoybu.com). Private repo.

## Books

- **Book I — *Salt and Silence*** — in progress
- **Book II** — planned
- **Book III** — planned

## Stack

Next.js 14 (App Router) reader, cloned from sibling [sea-reader](https://github.com/finnoybu/sea-reader). Server-rendered markdown via `gray-matter` + `marked`. Node 24.x, pnpm 9.

## Local

```bash
pnpm install
pnpm dev
```

## Structure

- [content/en/](content/en/) — the novel, one markdown file per chapter, frontmatter `id` is sort key
- [docs/private/trilogy-plan.md](docs/private/trilogy-plan.md) — plan of record
- [docs/private/names-index.md](docs/private/names-index.md) — working name → publication name tracking
- [CLAUDE.md](CLAUDE.md) — context for AI collaboration

## Copyright

© 2026 Kenneth Tannenbaum (writing as E. A. Westbo). All rights reserved.
