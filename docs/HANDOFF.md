# Design handoff inspection

All four supplied archives were extracted and inspected before implementation. The repository initially contained only a README. Attached boards describe design/content intent; the user’s website-development request defines implementation scope.

## Source priority and page map

Final desktop references take precedence over normalized library examples. The single-page sitemap and wireframe map to these anchors:

| Reference section                  | Anchor       | Functional components                                                                 |
| ---------------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| Hero / Home                        | `home`       | Logo, main navigation, theme toggle, local project guide                              |
| Saga of the Husky                  | `about`      | Story card, original emblem, community availability dialog                            |
| NFT Minting                        | `mint`       | Three real HTML cards, attributes, Ethereum/Arbitrum mint requirement dialogs         |
| The Husky Team                     | `team`       | Original landscape banner, six-position keyboard-accessible carousel                  |
| Estimated Previous Airdrops        | `calculator` | Three rewards, 1–38 month slider, 17 period controls, explanation dialog, back to top |
| Generic Project Questions + Footer | `faq`        | Six accessible accordion rows, home link, social availability dialogs                 |

At 1920px, content spans 1420px with 250px side margins. Each reference section is 1080px high. Fluid container widths, type sizes, and section minimum heights preserve the desktop proportions at 1440px and 1600px without scaling or absolutely positioning an entire Figma frame. The hero, mint background, team artwork, tier artwork, and blue FAQ section remain fixed-color in both themes.

## Extracted tokens

| Role            | Light     | Dark      |
| --------------- | --------- | --------- |
| Main background | `#E6F0F8` | `#393939` |
| Card surface    | `#FFFFFF` | `#555555` |
| Primary text    | `#1C1C1C` | `#FFFFFF` |
| Brand accent    | `#1595F9` | `#1595F9` |

Typography: Prompt for brand/UI; Inter for NFT-card content. Display 96px bold with 5% tracking; headings 48px and 64px as authored in the final pages; team profile titles 36px; body 20px; small body 16px. The shared spacing scale is 4, 8, 12, 16, 24, 32, 48, 64, 96px, with original larger layout measurements preserved where the final reference requires them.

The final design’s generous card corners and 72px CTA heights take priority over the normalized library’s smaller defaults. White brand-button text uses 20px bold type to meet large-text contrast. Smaller modal actions use a darker blue treatment because no modal visual was supplied and small white text on the brand blue has insufficient contrast. Focus rings, plus/minus indicators, theme control, mint status text, and labelled sample states are small functional/accessibility additions.

## Missing or ambiguous inputs

- No graphic required for the visible reference is missing. The original green character file is named `1_Siberian Apprentice_R.png`, while the final card calls it **Tier 1 Mage**. The final reference label and original green artwork are used together. The blue `2_Siberian Mage_R.png` is preserved as an additional asset.
- Font binaries were not included. The named Prompt/Inter families are bundled using Fontsource.
- Only HuskyCoder’s team profile is available. Six carousel positions appear in the final reference; five explicitly labelled pending profiles preserve those positions without inventing identities.
- Official external URLs are unverified. Local informational dialogs provide useful outcomes; no social handles or Discord invites are guessed.
- Wallet, contracts, chain configuration, mint APIs, actual prices, supply, rarity, staking, eligibility, and distribution rules are unavailable. Reference attributes are displayed, and mint submission remains disabled.
- The reference contains 38-month reward estimates and a slider but supplies no historical dataset or calculation formula. The implemented linear sample is explicitly described in the UI and source. The 17 circular controls represent sample period choices, not invented airdrop projects.
- Only the last FAQ answer has supplied text. Other answers explain confirmed tier reference values or identify missing policies instead of asserting undocumented terms.

## Complete supplied file inventory

### Archive: Zip 1_Reference desktop-sitemap-wireframe.zip

- `01_Reference desktop/Desktop - 1 - 1920 wide.jpg` — light reference, 1920 × 6480.
- `01_Reference desktop/Desktop - 2 - 1920 wide.jpg` — dark reference, 1920 × 6480.
- `02_Sitemap/Interaction notes.png` — inferred interaction guidance, 1520 × 1521.
- `02_Sitemap/Sitemap — single-page architecture.png` — section and destination map, 1520 × 1660.
- `03_Wireframe/Desktop wireframe — source layout.png` — source structure, 1440 × 4860.

### Archive: Zip 2_design system 1.zip

- `04_design system 1/01 — Brand Identity.svg` — brand, original colors, character family.
- `04_design system 1/02 — Color Palette.svg` — primitive and semantic theme colors.
- `04_design system 1/03 — Typography.svg` — Prompt/Inter assignments and type scale.
- `04_design system 1/04 — Icons & Graphic Assets.svg` — original icons and emblem.
- `04_design system 1/Sybil Husky/Library cover.svg` — library cover.

### Archive: Zip 3_design system 2.zip

- `04_design system 2/05 — Backgrounds & Visual Assets.jpg` — day/night artwork and treatments.
- `04_design system 2/06 — Spacing & Layout.svg` — spacing, radii, component/layout guidance.
- `04_design system 2/07 — UI Components.svg` — buttons, navigation, mint cards, theme cards, FAQ, utility controls.
- `04_design system 2/08 — Design Tokens & Themes.svg` — semantic token wiring.
- `04_design system 2/09 — Usage Guidelines.svg` — reference preservation and contrast notes.

### Archive: Zip 4_assets.zip

- `05_assets/background/BG+texture Artwork 02 1.jpg` — original day landscape, 1920 × 1080.
- `05_assets/background/BG_night_70 brightness 1.jpg` — original night landscape, 1920 × 1080.
- `05_assets/characters/1_Siberian Apprentice_R.png` — green husky, 300 × 300.
- `05_assets/characters/2_Siberian Mage_R.png` — blue husky, 300 × 300.
- `05_assets/characters/3_Siberian Sorcerer_R.png` — purple husky, 300 × 300.
- `05_assets/characters/4_Siberian Supreme_R.png` — red/yellow husky, 300 × 300.
- `05_assets/characters/Baby Husky Face 01+.png` — pink-background baby husky, 300 × 300.
- `05_assets/characters/Baby Husky Face 02+.png` — blue-background baby husky, 300 × 300.
- `05_assets/logo/Group 24.svg` — original emblem, 460 × 460.
- `05_assets/NFT Cards/NFT Card.png` — exported Mage card, 352 × 570, reference only.
- `05_assets/NFT Cards/NFT Card-1.png` — exported Sorcerer card, 352 × 570, reference only.
- `05_assets/NFT Cards/NFT Card-2.png` — exported Supreme card, 352 × 570, reference only.

Original asset files are copied byte-for-byte to `public/assets/`. Icons are extracted as vector paths from the original icon/UI boards: Twitter, Discord, Ethereum, and Arbitrum. Page exports and design-system boards are not used as interface backgrounds or rendered as whole-page images.
