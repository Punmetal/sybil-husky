# Validation results

Validation was performed in the actual cloud workspace with Node.js 24.19.0, npm 11.9.0, and Chromium 154.0.8037.57.

| Check | Result |
| --- | --- |
| Frozen installation: `npm ci --cache /workspace/.cache/npm --no-audit --no-fund` | Passed |
| `npm run typecheck` | Passed |
| Optimized Next.js production build | Passed; home page statically prerendered |
| `npm run test:e2e` | 13 passed, 0 failed, 0 skipped |
| Light and dark desktop layouts at 1440, 1600, and 1920px | Passed; six full-page screenshots captured |
| Original artwork and image paths | Passed; images decoded and requests checked for failures |
| Horizontal overflow at the three desktop widths | None |
| Browser runtime and console errors in the production test suite | None |
| Theme persistence and OS preference initialization | Passed |
| Navigation, project guide, community/social dialogs, back to top | Passed |
| All six tier/network mint controls | Passed; wallet and mint submission correctly unavailable |
| Team carousel previous/next, wraparound, dots, arrow keys | Passed |
| Sample estimator slider, milestone controls, explanation dialog | Passed |
| All six FAQ rows with Enter/Space | Passed |
| Modal focus wrapping, Escape, focus restoration | Passed |
| Reduced motion in modal and component styling | Passed |
| Axe WCAG A/AA checks on six layout/theme combinations and dark guide dialog | No detected violations |
| Actual development server smoke check | Theme switch and guide dialog worked; no browser errors |
| Supplied asset SHA-256 comparison | All 12 original assets preserved byte-for-byte |

The final production suite ran with two workers. Visual review compared every section in both themes against the original desktop JPEGs, with 1920px as the primary target. A final spacing adjustment keeps expanded FAQ content separated from the footer at narrower desktop widths. Full-resolution screenshots are written to ignored `test-results/` paths; delivery copies were saved in `/workspace/sybil-husky-preview/desktop-{1440,1600,1920}-{light,dark}.png`.

The original `+` in the daytime background filename required encoding each asset path segment before passing it to Next.js. Original names were preserved. Next.js development origin configuration was also corrected for the local browser runner. These issues were diagnosed and corrected; the final checks used the production server rather than suppressing console errors.

These checks verify frontend behavior, not blockchain transactions or live airdrop calculations. Automated axe checks do not constitute a complete accessibility audit. Firefox, Safari/WebKit, mobile/tablet layouts, real wallets, backend data, hosted deployment, and fresh-task snapshot restoration were not tested. No Vercel authentication or deployment project was available in this session.
