# Design — BokSusjed

Locked design system for the BokSusjed neighborhood app. Every page reads this file
before emitting UI. Warm, neighborly, trustworthy — not a generic AI template.

## Genre

**Atmospheric** — soft warmth, community intimacy, local trust. Not corporate SaaS coldness.

## Macrostructure family

- **App pages** (feed, map, help, profile, create): **Community Workbench** — left nav /
  sticky header, content column, optional right rail. Cards as handwritten notices on warm paper.
- **List pages** (recommendations): same family, card grid with human-scale spacing.

## Theme — Susjed (custom, anchor #16A34A)

- `--color-paper` — warm cream-green base
- `--color-paper-2` — elevated surfaces (cards)
- `--color-paper-3` — inset / chips
- `--color-ink` — warm near-black body text
- `--color-ink-2` — secondary text
- `--color-muted` — de-emphasised labels
- `--color-rule` — dividers
- `--color-accent` — brand green #16A34A territory
- `--color-accent-strong` — hover / pressed
- `--color-accent-soft` — subtle green wash
- `--color-accent-ink` — text on accent fills
- `--color-warm` — neighborly highlight (recommendations, invites)
- `--color-warm-ink` — text on warm surfaces
- `--color-focus` — focus rings

## Typography

- **Display:** Fraunces, weight 600 — page titles, wordmark
- **Body:** Source Sans 3, weight 400–600 — UI copy
- Display tracking: -0.02em on headings
- Scale anchor: page title `clamp(1.25rem, 2vw + 1rem, 1.75rem)`

## Spacing

4-point named scale in `src/styles/tokens.css`. Use `var(--space-*)` or Tailwind spacing
mapped from tokens. Cards: `--space-md` padding. Section gaps: `--space-lg`.

## Motion

- `--ease-out`: cubic-bezier(0.16, 1, 0.3, 1)
- Reveal: fade only, 200–250ms
- Reduced motion: opacity-only, ≤150ms
- No bouncy easings on UI chrome

## Microinteractions

- Silent success toasts (short, bottom)
- Hover on cards: subtle shadow lift on desktop only
- Focus-visible: 2px `--color-focus` ring, instant
- Like button: small scale pulse — allowed, physical not chrome

## CTA voice

- **Primary:** filled accent, 10px radius (not pill), semibold, white/accent-ink text
- **Secondary:** outline on rule border, paper-2 fill, ink text
- **Warm CTA:** warm surface + warm-ink text for recommendations cross-links

## What pages MUST share

- Fraunces display + Source Sans 3 body
- Accent green placement ≤5% per viewport (CTAs, active nav, key actions)
- Card shape: `--radius-card`, paper-2 bg, rule border
- Warm paper background — no cold slate gradients

## What pages MAY differ on

- Right rail content (feed has aside, map/help omit)
- Map-specific chrome
- Filter pill layoutIds per page

## Exports

Canonical tokens: `src/styles/tokens.css`
