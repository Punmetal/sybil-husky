# Sybil Husky

A functional desktop website built from the supplied Sybil Husky design handoff with Next.js 16, React, TypeScript, and CSS Modules. The original landscape, husky artwork, and vector logo are preserved. Page copy, controls, cards, and navigation are HTML components, not exported page images.

## Develop

Requires Node.js 20.9 or newer and npm. Node.js 24 was used for validation.

```bash
npm ci
npm run dev
```

The development server listens on port 3000. In the cloud workspace, use a writable npm cache if the default home directory is read-only:

```bash
npm ci --cache /workspace/.cache/npm
```

```bash
npm run typecheck
npm run build
npm run start
```

The production server also defaults to port 3000. To choose another port, run `npm run start -- --port 3001`.

## Desktop scope and interactions

- Six main sections preserve the 1920 × 6480 reference composition. Grid and Flexbox layouts also support 1440px and 1600px desktop widths. The page has a 1100px minimum width; mobile and tablet layouts are intentionally deferred.
- Light and dark modes use semantic CSS variables. The stored preference wins over the OS theme; the initial theme script runs before the page paints. Storage failures do not prevent switching themes.
- Navigation and back-to-top links scroll to real section anchors.
- The six-position team carousel supports buttons, pagination, arrow keys, and reduced motion. Only HuskyCoder’s biography was supplied; the other five positions explicitly await confirmed profiles.
- All six FAQ rows support keyboard expansion and collapse. The final question starts expanded, as in the reference.
- Mint controls select a tier and network, display its reference attributes, and explain wallet requirements. Wallet connection and mint submission remain disabled. No blockchain transactions or successful wallet states are fabricated.
- The airdrop slider and period buttons update an explicitly labelled sample model. The original 38-month values are preserved. Other periods use `reference reward × selected months ÷ 38`. These are illustrations, not actual distributed rewards or predictions.
- Documentation opens a local project guide until an official URL is supplied. Unverified social/community destinations open a clear availability dialog instead of guessing URLs.
- Native modal dialogs support Escape, backdrop dismissal, focus containment, and focus restoration. Motion respects `prefers-reduced-motion`.

## Source organization

```text
src/app/                  App Router page, metadata, theme bootstrap, global resets
src/components/           Navigation, theme, cards, carousel, estimator, FAQ, dialogs
src/data/content.ts       Authored copy, tiers, team profiles, verified-link configuration
src/data/estimates.ts      Clearly documented illustrative calculation
src/styles/tokens.css     Semantic colors, typography, spacing, motion, desktop sizing
src/styles/site.module.css Scoped component styling
public/assets/            Original supplied artwork and extracted vector icons
tests/desktop.spec.ts     Browser functional, layout, image, console, and axe checks
docs/HANDOFF.md           Complete handoff inventory, design decisions, missing inputs
```

Prompt and Inter are bundled locally through Fontsource; the browser does not need Google Fonts access. `next/image` optimizes raster assets. Original filenames are retained, and asset path segments are URL-encoded to preserve spaces and `+` characters. Exported NFT-card images are retained for traceability but are not used to render the interactive cards.

## Browser checks

```bash
npx playwright install chromium
npm run test:e2e
```

The test command builds and starts a production server on port 3100. If system Chromium is installed at `/usr/bin/chromium`, it is used automatically. Override its path with `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. To test an already running server, set `E2E_BASE_URL`.

Checks cover both themes at 1440, 1600, and 1920 pixels, all original image paths, overflow, theme persistence, every mint action, navigation, carousel, estimator, all FAQ rows, modal focus, reduced motion, browser errors, and axe WCAG A/AA rules. Full-page screenshots are generated in `test-results/`, with the report in `playwright-report/`. Automated accessibility checks complement manual review; they are not a complete accessibility certification.

## Vercel deployment

Import the existing `Punmetal/sybil-husky` repository and select the feature branch for a preview. Use the Next.js framework preset, repository root as the project root, `npm run build` as the build command, and the default Next.js output setting. Select Node.js 24 or another supported version at least 20.9. No secrets or environment variables are required to run this frontend preview.

No hosted deployment is claimed without an actual deployment result. Add production URLs and integrations only after they are confirmed.

## Inputs needed for a live launch

1. Verified official documentation, X/Twitter, and Discord URLs in `src/data/content.ts`.
2. Five remaining team names, roles, and biographies; confirmed final carousel member count.
3. Confirmed collection supply, rarity information, eligibility, staking, and reward distribution terms. Missing FAQ answers currently identify the unavailable policies.
4. Wallet provider, supported chain IDs, verified smart-contract addresses and ABI, token pricing, mint limits/supply, and transaction/error handling.
5. Historical reward data and an approved estimator formula/API. Replace the illustrative linear model before presenting real estimates.
6. Deployment project access to publish a hosted Vercel preview.

No credentials belong in the source tree or browser bundle.
