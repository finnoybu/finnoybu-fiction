# Image prompt framework — Finnoybu trilogy

**Purpose:** Single source of truth for the per-chapter image prompts used for site hero images. One image per chapter across the trilogy (~130+ images total when the trilogy is complete). Consistency across images matters; only the scene line and voice-modifier change per chapter.

**Generator:** Ken is using ChatGPT/DALL-E (memoirs-era experience: DALL-E maintained consistency well across ~70 images when the template stayed stable).

**Display:** Images are shown as chapter heroes on `fiction.finnoybu.com`. Unfinished/vignette edges intended to blend with the site background (`--color-bg: #e8ecee` light / `#08101a` dark). CSS-side vignette mask optional for further blending.

---

## Baseline template (Ken 2026-04-23)

```
[SCENE — one sentence describing the specific moment of the chapter]

Oil painting style with soft but visible brushwork. Norway, late 1800s. Muted gray palette. Quiet, elegiac tone.

Full-bleed composition — transparent background with vignette-safe crop

Export as PNG with transparent background only outside the painted frame (no simulated canvas or margin). The image itself should fill the frame completely.

Landscape orientation, 2:3.
```

Per-chapter change: only the first sentence (`[SCENE]`). Everything else is fixed for **Olav Book I** images.

---

## Voice / book modifiers (framework, TBD on specifics)

The baseline is calibrated to **Olav in Book I** (Scandinavian-plain register — cool slate palette, distant observational framing, figure-small-in-landscape). Other voices and later books will adjust specific lines in the template.

**Planned modifications:**

| Scope | Modifier target |
|---|---|
| **Olav Book II** (transitional) | Slightly richer palette, closer framing, more internal angle |
| **Olav Book III** (Miller-adjacent) | Warmest of the Olav range, intimate figural framing, more saturation |
| **Jens** (Robinson register) | Slightly warmer than Olav Book I (family crossover toward memoirs' parchment), single-figure contemplation, middle-distance meditative stillness |
| **Olava** (Tóibín register) | Domestic interior, warm lamp-glow against cool exterior, held object, waiting quality |
| **Haakon / Sven** (Proulx register) | Weather-forward, rougher brushwork, male physical presence, harsher near-black contrast |
| **Thoresen** (Hemingway aside — one chapter, Book III) | Spare, near-monochrome, single-object focus — almost a study |

Exact palette line + composition line for each modifier to be decided when first non-Olav-Book-I chapter needs an image.

---

## Chapter scene lines (Book I so far)

Only the first sentence changes between chapters. Everything after it stays as in the baseline template above.

### Ch 0 — Introduction

*"For Those Who Sailed in Silence"* — prologue, 72 words. No narrative scene. Could use the cover art (`finnoybu-salt-and-silence.png`) as-is, or generate a frame-only dedication image. **Decision deferred.**

### Ch 1 — Vestbø

> A morning on a Finnøy farm landing in June. An 18-year-old Norwegian boy and his older father carrying a wooden sea-chest to a small rowboat, viewed from the water. Mist over the fjord beyond.

*(Ken's working line; already generated 3 roughs.)*

### Ch 2 — Hebburn

> A late-afternoon in autumn 1875 at the Rutherford & Co. shipyard in Hebburn on the Tyne. An 18-year-old Norwegian sailor standing at the open iron gates of the yard, coal-smoke and scaffolding beyond him, looking in at an empty slip where his father was injured long before.

### Ch 3 — Homecoming

> Midday on a snow-dusted Finnøy island path in December, three miles from a landing. An 18-year-old Norwegian sailor in a heavy coat walking the road with a wooden sea-chest on his shoulder, cresting a low rise to see a single small farmhouse and a boy kneeling at its landing coiling a mooring line.

### Ch 4 — Winter

> A late-January afternoon on a snow-crusted Finnøy field. A young Norwegian in a heavy coat walking above the drifts on a hard snow-crust that holds his weight, the sea over the shoulder of a low hill to the west, a thin straight line of smoke rising from a farmhouse chimney below.

### Ch 5 — The Upper Field **(Jens POV — template adjustment needed)**

This chapter is in **Jens's Robinson register**, not Olav's Scandinavian-plain. Per the framework above, the palette/composition line should shift: *"slightly warmer than Olav Book I, single-figure contemplation, middle-distance meditative stillness."*

Until we lock the Jens modifier, candidate scene line for the current Olav template:

> A cold February morning on a Finnøy farm. A 52-year-old Norwegian man in a heavy coat walking up through snow along an old cart-track to a stone wall at the top of a field, looking down across white fields toward a distant farmhouse and a thin straight line of chimney smoke.

If used with the Olav template, the result will read as an Olav-book image of Jens; if we lock the Jens modifier first (warmer palette, closer frame, stiller composition), the image will feel like a Jens chapter.

---

## Notes from Ch 1 roughs (2026-04-23)

- **Unfinished edges** technique works via `"Full-bleed composition — transparent background with vignette-safe crop"` + the transparent-PNG export instruction. Visible feathering at margins; no hard rectangular frame.
- **Palette drift** risk: third rough came back warmer-brown (peasant-folklorist register) than the cover's cool slate + amber (Tonalist register). Mitigation in future generations: reinforce *"cool grey palette, not warm brown"* or name artist references (Turner / Whistler / Grimshaw).
- **Figure age accuracy**: first rough read as ~25; second and third landed closer to 18. Prompt-side improvement: keep the explicit *"18-year-old"* and possibly add *"late teens, slight build"* if generator tends old.
