# ang-ppt-skill · Web Decks / Images / Covers

![GitHub stars](https://img.shields.io/github/stars/AngChow/ang-ppt-skill?style=flat-square)
![License](https://img.shields.io/github/license/AngChow/ang-ppt-skill?style=flat-square)
![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)
![HTML Deck](https://img.shields.io/badge/HTML-Deck-0A7CFF?style=flat-square)
![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-6B5B95?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)

An agent skill for Claude Code, Codex, and similar coding-agent environments. It generates **single-file HTML horizontal-swipe decks**, deck visuals, and social cover pages.

It ships with three visual systems:

- **Style A: editorial magazine × electronic ink**. Picture *Monocle* with code stitched in. Best for narrative talks, opinions, salons, and personal voice.
- **Style B: Swiss International Typographic Style**. Grid-first, one high-saturation anchor color, sharp rectangles, hairline rules, and extreme type contrast. Best for facts, products, analysis, and frameworks.
- **Style C: qjyd-corp enterprise (B2B SaaS)**. Rounded enterprise-SaaS aesthetic (8px radius cards + soft shadows + floating SVG geometry), teal as the default accent, system-font first. Best for B2B SaaS product intros, sales proposals, customer cases, and client-facing decks; ships with 13 `C01-C13` locked layouts and a default Xinrenxinshi (薪人薪事) brand logo.

> This skill is a derivative work based on [op7418/guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) (AGPL-3.0). On top of the original Style A (editorial magazine) and Style B (Swiss international typography), it adds Style C — qjyd-corp enterprise — plus assorted engineering refinements.

**Old Theme · Style A Editorial Magazine**

![Style A Editorial Magazine preview](https://github.com/user-attachments/assets/5dc316a2-401c-4e37-9123-ea081b6ae470)

**New Theme · Style B Swiss International**

![Style B Swiss International preview](https://github.com/user-attachments/assets/8960e78c-69bb-4b7e-aa95-6fad64b70314)

**New Theme · Style C qjyd-corp Enterprise (B2B SaaS)**

<!-- TODO: Add Style C overall cover preview → assets/readme/style-c-cover.png -->
![Style C qjyd-corp enterprise preview](./assets/readme/style-c-cover.png)

## Prerequisites

### Required

- **Node.js ≥ 18** (on macOS with Codex.app, the bundled `cua_node` already includes it)
- **A modern browser** (Chrome / Edge / Safari ≥ 16; Chrome is recommended for the smoothest WebGL frame rate during live demos)
- **Network access to Google Fonts CDN** (Style A and Style B only; **Style C uses system fonts and is the safest choice on intranet / restricted networks**)

### Strongly Recommended (without these, visual self-check is crippled)

- **Playwright + Chromium headless shell** (so the AI can batch-screenshot decks for visual self-check)

  The AI calls Playwright via `mcp__node_repl-js` against the bundle inside Codex.app (`/Applications/Codex.app/Contents/Resources/cua_node/lib/node_modules/playwright`). **The Chromium headless shell binary (~94 MiB) needs to be downloaded once.** You can either let the AI fetch it on first failure following SKILL.md §4.0.1, or run this once up-front:

  ```bash
  /Applications/Codex.app/Contents/Resources/cua_node/bin/node \
    /Applications/Codex.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/cli.js \
    install --only-shell chromium
  ```

  - Official source `cdn.playwright.dev` is usually reachable from China; ~80s download
  - If blocked, use the Aliyun mirror: `export PLAYWRIGHT_DOWNLOAD_HOST=https://npmmirror.com/mirrors/playwright`
  - If install fails, the AI falls back to system Chrome `--headless --screenshot=...` (functionally equivalent, slightly weaker WebGL background)

  > ⚠️ **The pinned Chromium revision is dictated by Codex.app's bundled Playwright version, not by this skill.** Any visual-automation skill (decks / frontend / scraping / PDF) you run inside Codex hits the same pin. This skill itself does not depend on Playwright.

### Multimodal Vision (strongly recommended)

Building decks is a **vision-heavy** task; the AI needs to "see" images at multiple stages:

| Stage | Without multimodal |
|---|---|
| **Screenshot self-check** (most critical) | Falls back to grep / DOM inference and **cannot detect "image stacked at bottom", "title squashed to one char per line", "card alignment drift" — the exact bugs visual self-check exists for** |
| **Image+text layouts** (C08 / S22 / Layout 4) | Cannot see image subject position or whitespace ratio, so cropping strategy guesses |
| **Replacing placeholders with real images** | Cannot tell horizontal / vertical / square; cannot pick the right `.qjyd-img-fit` parent container |
| **Screenshot framing / redesign** | The whole `screenshot-framing.md` chapter assumes you can see the source screenshot |

**Recommended**: a natively multimodal model — `gpt-5.5` (Azure), `gpt-4o`, `Claude 3.5+`, `Gemini 2.x`, `Qwen-VL`, `doubao-seed-2.0-pro`.

**Acceptable**: a text-only model + a vision API fallback (e.g. `azure-vision.py`); usable but visual debug detail loses one tier.

**Worst**: a text-only model with no vision fallback — visual debug becomes pure human work and the AI degrades from "design assistant" to "HTML helper."

### Minimal install checklist

```bash
# Required
brew install node                         # if your machine doesn't have Node 18+

# Strongly recommended: trigger automatically on first deck task, or run manually:
/Applications/Codex.app/Contents/Resources/cua_node/bin/node \
  /Applications/Codex.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/cli.js \
  install --only-shell chromium

# Model layer: configure a natively multimodal model (in ~/.codex/config.toml or the agent's settings)
```

---

## 30-second start

```bash
npx skills add https://github.com/AngChow/ang-ppt-skill --skill ang-ppt-skill
```

Or paste this to an AI agent with shell access:

```text
Install ang-ppt-skill for me. Clone https://github.com/AngChow/ang-ppt-skill into ~/.claude/skills/ang-ppt-skill, then verify that SKILL.md, assets/, and references/ exist.
```

If you already installed it, update with:

```text
Update ang-ppt-skill for me. Go to ~/.claude/skills/ang-ppt-skill, run git pull, then tell me the latest commit.
```

Then ask your agent:

```text
Create a Swiss-style deck from this article, around 7 slides, with 2-3 generated visuals.
```

Other useful prompts:

```text
Turn this Markdown file into an editorial magazine-style presentation.
Create a 21:9 social cover from the core idea of this deck.
Redesign this product screenshot as a 16:10 slide visual.
```

## What you get

- 🖋 **Three visual systems**: editorial storytelling for Style A, factual Swiss structure for Style B, enterprise SaaS aesthetic for Style C (qjyd-corp)
- 📐 **Horizontal swipe navigation**: ← → arrows / scroll wheel / touch swipe / bottom dots / ESC for index
- 🧩 **Style A 10 layouts**: cover, divider, big numbers, image/text, image grid, pipeline, comparison, and more
- 🧱 **Style B 22 locked layouts**: Cover, Statement, KPI Tower, Loop Diagram, Duo Compare, Image Hero, Closing Manifesto, and more
- 🟢 **Style C 13 enterprise layouts**: Cover hero, chapter divider, agenda, big-number KPI, triple KPI, timeline, 4-card matrix, image+text, full-bleed image, pull quote, comparison table, team intro, Thank You
- 🎨 **Curated theme presets**: 5 electronic-ink themes for Style A, 4 Swiss anchor-color themes for Style B, 4 enterprise-SaaS themes for Style C (Mint Enterprise / Cyan Tech / Warm Orange Proposal / Deep Space Review)
- 🖼 **Optional Codex image flow**: generate documentary photos, infographics, flow diagrams, system maps, and UI scenes with GPT-Image 2.0 / GPT-M 2.0, then insert them at template-safe ratios
- 📰 **Social covers**: generate 21:9 WeChat cover images, 1:1 share cards, 3:4 Xiaohongshu covers, video thumbnails, and related variants
- 📴 **Low-power static mode**: press `B` to turn WebGL / canvas animation into static visuals
- 📄 **Single HTML file** — no build, no server, open directly in the browser

## Fits / Doesn't fit

**✅ Fits**: offline talks, industry keynotes, private salons, AI product launches, demo day, presentations with strong personal voice

**❌ Doesn't fit**: data-heavy tables, training decks (density too low), multi-user collaborative editing (static HTML)

## Common use cases

| Task | Recommended flow |
|------|------------------|
| Long article to talk deck | Extract the core argument, then build a 6-10 slide rhythm |
| Framework / product analysis | Use Style B Swiss with locked layouts and 21:9 hero visuals |
| Personal talk / opinion piece | Use Style A editorial magazine for stronger narrative rhythm |
| Deck visuals | In Codex, generate photos, infographics, flow diagrams, system maps, or UI scenes |
| Social covers | Generate 21:9 main covers, 1:1 share cards, 3:4 vertical covers, and video thumbnails from the same idea |
| Screenshot normalization | Redesign raw screenshots into template-safe ratios before inserting them into slides |

## Why HTML decks

- **Agent-native editing**: HTML / CSS is plain text, so agents can read, edit, and validate it directly.
- **Higher visual density than Markdown**: precise layout, positioning, motion, interactivity, and cover formats.
- **Lightweight delivery**: one HTML file can be opened, presented, sent, screenshotted, or recorded.
- **Better quality gates**: the Swiss validator can catch layout drift, unsafe image placement, centered body titles, and SVG text traps.
- **One visual system across outputs**: decks, generated visuals, covers, and screenshot redesigns can share the same style rules.

## Platform support

| Platform | Status | Notes |
|----------|--------|-------|
| Claude Code | Supported | Native Skill workflow for creating and iterating HTML decks |
| Codex | Supported | All three styles full coverage — Style C is the most natural fit for B2B sales / business proposal scenarios. Good for deck generation, image generation, and browser-based visual QA. |

## Install

### Option 1: One-line install (recommended)

```bash
npx skills add https://github.com/AngChow/ang-ppt-skill --skill ang-ppt-skill
```

### Option 2: Paste this to an AI

> Install the `ang-ppt-skill` Claude Code skill for me. Steps:
>
> 1. Make sure `~/.claude/skills/` exists (create if not)
> 2. Run `git clone https://github.com/AngChow/ang-ppt-skill.git ~/.claude/skills/ang-ppt-skill`
> 3. Verify: `ls ~/.claude/skills/ang-ppt-skill/` should show `SKILL.md`, `assets/`, `references/`
> 4. Tell me when done. Later, saying things like "make me a magazine-style deck" will trigger this skill.

Paste the block above into Claude Code / Cursor / any AI agent with shell access and it handles the install.

### Option 3: Manual CLI

```bash
git clone https://github.com/AngChow/ang-ppt-skill.git ~/.claude/skills/ang-ppt-skill
```

### How to trigger it

Once installed, Claude Code auto-detects the skill. Trigger phrases:

- "Make me a magazine-style deck"
- "Make me a Swiss-style deck"
- "Generate a horizontal swipe deck"
- "Editorial magazine style presentation"
- "Electronic ink slides for my talk"
- "Create a B2B SaaS product pitch deck"
- "Make me a Xinrenxinshi-style sales proposal deck"
- "qjyd-corp enterprise web deck"
- "Create a 21:9 WeChat cover from this article"
- "Create a 1:1 share card from this deck"

## Workflow

The skill is a structured workflow; the agent walks you through each step:

1. **Choose style** — Style A editorial magazine, Style B Swiss International, or Style C qjyd-corp enterprise (B2B SaaS)
2. **Clarify intent** — 7-question checklist: style, audience, duration, source material, images/screenshots, theme, hard constraints
3. **Copy template** — Style A uses `assets/template.html`; Style B uses `assets/template-swiss.html`; Style C uses `assets/template-corp.html` (and copy `assets/qjyd-corp/xrxs-logo.png` to your project's `images/logo.png`)
4. **Fill content** — create a rhythm plan, then choose and adapt the matching layout skeletons
5. **Optional image generation** — in Codex, ask whether to use GPT-Image 2.0 / GPT-M 2.0 images, then insert them at page-appropriate ratios
6. **Self-check** — match against `references/checklist.md`; P0 issues must all pass; Swiss decks must also pass the layout validator
7. **Preview** — open the HTML in a browser
8. **Iterate** — use inline styles to tune font size, height, spacing

Full spec in [`SKILL.md`](./SKILL.md).

## Style B Swiss

The Swiss theme is a strict layout system, not just a CSS skin.

- **22 named layouts**: body slides must use `S01` to `S22`; do not invent new structures
- **4 anchor colors**: International Klein Blue, lemon yellow, lemon green, safety orange
- **Grid lock**: 16-column grid, sharp rectangles, 1px hairlines, no shadows, no gradients, no rounded cards
- **Chinese title scaling**: all-Chinese headlines should be one step smaller to preserve space for content and images
- **Image/text bottom alignment**: text and image blocks should align at the bottom in left/right image layouts, while staying clear of pagination controls
- **Image slots**: images must sit in template-defined `data-image-slot` regions, often generated at 21:9 or 16:10
- **Hard validation**: the validator catches centered body titles, experimental layouts, visible SVG text, and images placed outside slots

Swiss validation:

```bash
node scripts/validate-swiss-deck.mjs path/to/index.html
```

## Style C qjyd-corp Enterprise (B2B SaaS)

Style C is the "enterprise SaaS aesthetic" optimized for B2B commercial scenarios. **The default product anchor is Xinrenxinshi (薪人薪事)** — teal `#00BFA5` plus the bundled logo at `assets/qjyd-corp/xrxs-logo.png` — but the logo and brand color can be swapped for any other enterprise.

- **13 named layouts**: `C01` cover hero / `C02` chapter divider / `C03` agenda / `C04` big-number KPI / `C05` triple KPI / `C06` timeline / `C07` 4-card matrix / `C08` image+text / `C09` full-bleed image / `C10` pull quote / `C11` comparison table / `C12` team intro / `C13` Thank You
- **4 theme colors**: 🌿 Mint Enterprise (default / general) · 🌊 Cyan Tech (technical sharing) · 🌅 Warm Orange Proposal (sales pitch) · 🌌 Deep Space Review (level-up review / dark-base reverse theme)
- **Rounded enterprise SaaS aesthetic**: 8px card radius + soft shadows + floating SVG geometry; **no** WebGL background (lower rendering cost, more stable on conference-room projectors)
- **System-font first**: PingFang SC + Helvetica Neue with no Google Fonts CDN dependency; safest for intranet / restricted networks
- **Default logo slot**: cover C01 right side and Thank You C13 right side load `./images/logo.png` first, falling back to the bundled `xrxs-logo.png` (Xinrenxinshi logo, 512×512 transparent PNG)
- **Image placeholder vs real image separation**: templates ship with `.qjyd-img-placeholder` (production-grade placeholders); replace the entire block with `<img class="qjyd-img-fit">` once real images arrive
- **Strict redlines**: 17 generation redlines documented in `SKILL.md`, covering container alignment, entrance motion, image parent-child contracts, accent color consistency, etc. qjyd-corp does not have a standalone validator like Style B, but every `<section>` must carry `data-layout="Cxx"`

Best for: **SaaS product intros / sales proposals / customer cases / client-facing demos / team weekly reports / quarterly business reviews**.

Not for: art, literature, cultural content (use Style A); information-driven design / framework presentations (use Style B).

## Codex Image Flow

In Codex, after the first deck draft is ready, the agent can ask whether the user wants generated visuals. Once confirmed, choose an image type or style. Common types include:

- Documentary photos: Fuji / Leica-like real-world scenes that add human texture
- Infographics / flow diagrams / comparison charts / system maps: for concepts that cannot be explained well with photos
- Screenshot framing / screenshot redesigns: preserve raw screenshots with bundled background assets and a CleanShot X-style canvas first; use UI scene generation only when the screenshot needs reconstruction
- Data posters / charts: turn key numbers into insert-ready visual assets
- Multi-image compositions: useful for ultra-wide slots where three unrelated 16:9 images would break the grid

Generated images must follow four core rules:

- Treat the image as an embedded asset, not a standalone slide: no footer, page bottom, title, page number, corner mark, signature, or decorative border
- Match the deck language: Chinese decks use Chinese labels inside infographics, English decks use English labels
- Match the slot ratio before generation: 21:9 for many Swiss hero slots, 16:9 / 16:10 for common main visuals, 16:10 for UI scenes, fixed equal heights for image grids
- When a raw screenshot must stay faithful, read `references/screenshot-framing.md` first and use bundled `assets/screenshot-backgrounds/` backgrounds plus programmatic scaling, padding, and alignment instead of redrawing the screenshot by default

Image prompts live in [`references/image-prompts.md`](./references/image-prompts.md). Screenshot framing lives in [`references/screenshot-framing.md`](./references/screenshot-framing.md).

## Cover Generation

The skill can also turn an article or deck idea into platform covers:

- **WeChat main cover**: 21:9, headline-first, with one visual anchor
- **WeChat share card**: 1:1, visually paired with the 21:9 cover
- **Xiaohongshu cover / carousel**: 3:4, large title, consistent type scale across a batch
- **Video thumbnail**: 16:9, title + subtitle + one focal visual

The same rule applies: use a few strong keywords, keep the title as the visual center, and do not fill the canvas with body copy.

## Example prompts

Copy any of these prompts into your agent, then attach your article, Markdown file, or image assets:

```text
Create an 8-slide Swiss-style deck from this article, with 3 generated visuals matched to the template image slots.
```

```text
Turn this product analysis document into an editorial magazine-style deck with a strong narrative rhythm.
```

```text
From this deck's core idea, create two covers: a 21:9 main cover and a visually paired 1:1 share card.
```

```text
Redesign these product screenshots into consistent 16:10 slide visuals. Preserve key UI information; do not add slide titles or footers inside the images.
```

## Directory

```
ang-ppt-skill/
├── SKILL.md              ← main skill file: workflow, principles, common mistakes
├── README.md             ← Chinese README
├── README.en.md          ← this file
├── assets/
│   ├── template.html         ← Style A editorial magazine template
│   ├── template-swiss.html   ← Style B Swiss template
│   ├── template-corp.html    ← Style C qjyd-corp enterprise template (B2B SaaS)
│   ├── qjyd-corp/            ← Style C dedicated assets
│   │   ├── xrxs-logo.png     ← default product logo (Xinrenxinshi; used on cover / Thank You by default)
│   │   └── c08-xinling.jpg   ← C08 demo image (template sample only; do not copy into generated projects)
│   ├── motion.min.js         ← local copy of Motion One (offline fallback, shared by all 3 styles)
│   └── screenshot-backgrounds/ ← bundled WebP screenshot backgrounds: 5 style-a / 4 style-b
├── scripts/
│   └── validate-swiss-deck.mjs ← Swiss layout validator (qjyd-corp reuses it; only checks data-layout)
└── references/
    ├── components.md     ← component catalog (type, color, grid, icons, callout, stat, pipeline)
    ├── layouts.md        ← Style A · 10 layout skeletons (paste-ready)
    ├── layouts-swiss.md  ← Style B · 22 locked Swiss layouts
    ├── layouts-corp.md   ← Style C · 13 locked enterprise layouts
    ├── swiss-layout-lock.md ← Swiss fidelity and layout hard rules
    ├── swiss-map-component.md ← Style B · S08 map extension component (MapLibre)
    ├── themes.md         ← Style A · 5 theme presets (pick, don't customize)
    ├── themes-swiss.md   ← Style B · 4 Swiss anchor-color themes
    ├── themes-corp.md    ← Style C · 4 enterprise SaaS theme presets
    ├── image-prompts.md  ← GPT-Image 2.0 / GPT-M 2.0 image types, ratios, and base prompts
    ├── screenshot-framing.md ← CleanShot X-style screenshot framing semantics
    └── checklist.md      ← quality checklist (P0 / P1 / P2 / P3 tiers)
```

## Theme presets

Pick from `references/themes.md`. **Custom hex values are not allowed** — protecting the aesthetic matters more than freedom of choice.

### Style A Editorial Themes

| Preview | Theme | Core colors and best for |
|---------|-------|--------------------------|
| <img src="https://github.com/user-attachments/assets/df21dbcb-5fe4-4852-a91a-a9cf00aceeb4" width="260" alt="Ink Classic theme preview"> | 🖋 **Ink Classic** | `#0a0a0b` / `#f1efea`. General default, commercial launches, when in doubt. |
| <img src="https://github.com/user-attachments/assets/99ce0fd2-72a6-4368-a75a-a8e21657a537" width="260" alt="Indigo Porcelain theme preview"> | 🌊 **Indigo Porcelain** | `#0a1f3d` / `#f1f3f5`. Tech, research, AI, technical keynotes. |
| <img src="https://github.com/user-attachments/assets/bcc1cc4c-5e8e-4467-ae8d-f5801ae73657" width="260" alt="Forest Ink theme preview"> | 🌿 **Forest Ink** | `#1a2e1f` / `#f5f1e8`. Nature, sustainability, culture, non-fiction. |
| <img src="https://github.com/user-attachments/assets/dfea080e-e916-417e-93cd-0a3628de84ca" width="260" alt="Kraft Paper theme preview"> | 🍂 **Kraft Paper** | `#2a1e13` / `#eedfc7`. Nostalgic, humanist, literary, indie zines. |
| <img src="https://github.com/user-attachments/assets/f3705592-9a72-4dbc-9818-df3aea61bc75" width="260" alt="Dune theme preview"> | 🌙 **Dune** | `#1f1a14` / `#f0e6d2`. Art, design, creative, fashion, gallery-like decks. |

Switching themes only requires replacing the 6 variables at the top of `template.html`'s `:root{}` block — all other CSS flows through `var(--...)`.

### Style B Swiss Themes

Pick from `references/themes-swiss.md`. **Custom hex values are not allowed** here either.

| Preview | Theme | Anchor color and best for |
|---------|-------|---------------------------|
| <img src="https://github.com/user-attachments/assets/c02d02f7-ce6f-4e16-b8a6-778c96851f94" width="260" alt="International Klein Blue Swiss theme preview"> | 🔵 **International Klein Blue** | `#002FA7`. Default, commercial launches, AI products, frameworks. |
| <img src="https://github.com/user-attachments/assets/c310a8c4-5d28-450e-b49a-6ac5b6ba4785" width="260" alt="Lemon Yellow Swiss theme preview"> | 🟡 **Lemon Yellow** | `#FFD500`. Youth, sports, retail, consumer goods, Y2K retro. |
| <img src="https://github.com/user-attachments/assets/65f7b3f9-3358-419e-b513-f7f2cc24ec76" width="260" alt="Lemon Green Swiss theme preview"> | 🟢 **Lemon Green** | `#C5E803`. Ecology, sustainability, health, Gen Z brands. |
| <img src="https://github.com/user-attachments/assets/9c3319c9-a134-4657-9a56-211c23411f7f" width="260" alt="Safety Orange Swiss theme preview"> | 🟠 **Safety Orange** | `#FF6B35`. Alerts, news, industrial topics, sports, energetic themes. |

If the user asks for a Swiss-style deck without specifying color, default to International Klein Blue.

### Style C qjyd-corp Enterprise Themes

Pick from `references/themes-corp.md`. **Custom hex values are not allowed.** A single deck **must use a single theme** — do not switch the accent color mid-deck.

| Preview | Theme | Anchor color and best for |
|---------|-------|---------------------------|
| <!-- TODO: assets/readme/style-c-theme-mint.png --><img src="./assets/readme/style-c-theme-mint.png" width="260" alt="🌿 Mint Enterprise theme preview"> | 🌿 **Mint Enterprise (default)** | `#00BFA5` ocean teal (Xinrenxinshi's brand color). General use / sales-facing / business proposals / customer-facing decks. **The default when in doubt.** |
| <!-- TODO: assets/readme/style-c-theme-cyan.png --><img src="./assets/readme/style-c-theme-cyan.png" width="260" alt="🌊 Cyan Tech theme preview"> | 🌊 **Cyan Tech** | `#006586` deep cyan ink. Tech sharing / data reporting / engineering presenting product architecture / B2B technical demos. |
| <!-- TODO: assets/readme/style-c-theme-orange.png --><img src="./assets/readme/style-c-theme-orange.png" width="260" alt="🌅 Warm Orange Proposal theme preview"> | 🌅 **Warm Orange Proposal** | `#FF7847` warm orange-vermilion. Sales proposals / growth reports / marketing campaign plans / customer case decks. |
| <!-- TODO: assets/readme/style-c-theme-deep.png --><img src="./assets/readme/style-c-theme-deep.png" width="260" alt="🌌 Deep Space Review theme preview"> | 🌌 **Deep Space Review** | `#1A2028` deep space blue-gray + `#00BFA5` mint accent. **The only dark-base theme** — promotion review / personal performance review / team retro / year-end summary. |

If the user asks for an "enterprise-style deck", "business proposal", or "Xinrenxinshi style" without specifying color, default to 🌿 Mint Enterprise.

> 💡 To replace the logo with a non-Xinrenxinshi one, just drop your product logo at `images/logo.png` inside the generated project. The template's `onerror` fallback automatically falls back to the SKILL-bundled logo, so the image never breaks. We also recommend tuning `themes-corp.md`'s accent color to match your brand — but only by picking from the 4 presets, no custom hex (aesthetic protection).

## Core design principles

1. **Restraint over flash** — WebGL backgrounds only bleed through on hero pages
2. **Structure over decoration** — information hierarchy via type size + typeface + grid whitespace, not shadows or floating cards
3. **Images are first-class citizens** — align them with the body content area, keep ratios stable, crop only from the bottom, and preserve top/sides
4. **Generated visuals are assets** — keep only the core photo / chart / UI; do not render slide titles, footers, or corner marks inside the image
5. **Rhythm lives on hero pages** — hero / non-hero alternation keeps the eye from fatiguing
6. **Dynamic effects must be optional** — `B` toggles static mode so animation never becomes a reading burden
7. **Terms stay consistent** — Skills is Skills; no mix-and-match translations
8. **Swiss layouts stay locked** — Style B should restore and reuse the original 22-page layout system instead of inventing unrelated pages
9. **Enterprise decks use one theme per deck** — Style C does not allow switching accent color mid-deck; the template ships with `.qjyd-img-placeholder` slots, and when a real image is available, replace the entire block with `<img class="qjyd-img-fit">` instead of nesting them
10. **Enterprise logo slots are brand slots, not decoration** — Style C cover / Thank You logos load from `./images/logo.png` (default = Xinrenxinshi); do not replace them with hand-drawn SVG geometry pretending to be a logo

## Visual references

- [*Monocle*](https://monocle.com) magazine layouts
- YC Garry Tan — "Thin Harness, Fat Skills"
- Massimo Vignelli / Helvetica Forever / Swiss International Typographic Style
- Notion / Linear / Stripe enterprise sites (Style C anchor references)
- Xinrenxinshi product UI (Style C default theme color baseline)

## Roadmap

- Add more real-world examples and openable HTML deck demos
- Expand cover formats for more publishing platforms
- Add more Swiss layout validation rules
- Improve screenshot redesign and infographic generation workflows
- Prepare marketplace-specific variants such as WorkBuddy
- Add more curated theme packs while keeping custom colors restricted
- Style C: add more enterprise layouts (product pricing comparison, customer journey map, industry benchmarks)
- Style C: support more enterprise logo / brand-color combos as `themes-corp.md` extension packs

## FAQ

**Can it export to PPTX?**
The main output is HTML. You can present it in a browser, screenshot it, or record it. PPTX conversion can be done as a separate workflow, but it is not the core path today.

**Why are custom colors not allowed?**
The skill is designed for stable visual output. Arbitrary colors often break the system, so decks must use curated presets.

**Can I add my own layout?**
Yes. Style A layouts can be extended in `references/layouts.md`. Style B is stricter: update `template-swiss.html`, `layouts-swiss.md`, `swiss-layout-lock.md`, and the validator together.

**Is Codex image generation required?**
No. Decks work without generated images. The image flow is only used when you need photos, infographics, UI scenes, or covers.

**How do I update the skill?**
Run the install command again, or run `git pull` inside your local skill directory.

**Style C's default logo is Xinrenxinshi — what if I'm building a deck for a different product?**
Just drop your product logo at `images/logo.png` inside the target project. The template loads `./images/logo.png` first and only falls back to the SKILL-bundled Xinrenxinshi logo if it fails to load — the image will never break. We also recommend tuning `themes-corp.md`'s `--accent` to match your brand — but only by picking one of the 4 presets; no custom hex (aesthetic protection mechanism).

**Why doesn't Style C have a strict validator like Style B?**
Style C's layout language is more flexible than Style B (C04 / C07 / C08 all allow free composition of cards / chips). Hard rules are mainly enforced by the 17 red lines in SKILL.md and the "2026-06 Update I~VI" sections in `layouts-corp.md`. `validate-swiss-deck.mjs` is also compatible with qjyd-corp — it just verifies that every page carries `data-layout="Cxx"`.

**First screenshot self-check fails with "chromium_headless_shell-XXXX not found" — what now?**
That's Codex.app's bundled playwright not having downloaded its browser binary yet — unrelated to the skill itself. Just run the install once per [Prerequisites](#prerequisites) — ~94 MiB, takes about 80 seconds.

## Contributing

Bugs, layout issues, new layout requests — Issues and PRs welcome. Prioritize:

- Add new classes to `template.html` first; don't let `layouts.md` reference undefined classes
- When changing `template-swiss.html`, update `layouts-swiss.md` and `swiss-layout-lock.md` together
- When adding Swiss rules, update `scripts/validate-swiss-deck.mjs`
- Log pitfalls into `checklist.md` at the matching P0 / P1 / P2 / P3 tier
- New theme colors go into `themes.md` with a recommended use case

## License

AGPL-3.0 © 2026 [op7418](https://github.com/op7418), with modifications by [AngChow](https://github.com/AngChow)
