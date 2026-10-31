# Dependency review

The October 2026 review updates MCP SDK 1.30.0 to 1.32.1,
DOMPurify 3.4.15 to 3.4.17, http-cache-semantics 4.2.0 to 4.3.0,
Sharp 0.35.4 to 0.35.5, smol-toml 1.8.0 to 1.9.1 and
source-map-js 1.2.1 to 1.2.2.

The 31 October 2026 update moves Blume from 2.0.3 to 2.2.6, which brings
patched Astro, Vite, Zod, Hono, undici, body-parser, fast-uri, ip-address and
KaTeX releases on its own, so the overrides that pinned those are gone. The
overrides that remain:

- `@astrojs/react` gets Blume's own `@vitejs/plugin-react` 6.1.1. The 6.1.2
  release requires `oxc-transform-react` 0.152 while Blume and `@astrojs/react`
  require 0.145, a peer set npm cannot satisfy; without the pin npm's resolver
  never finishes. Retire it when Blume moves to a React plugin that agrees with
  `@astrojs/react` on `oxc-transform-react`.
- Typography's postcss-selector-parser 6.0.10 to 7.1.7 fixes
  [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf).
  [The 7.0.0 breaking change](https://github.com/postcss/postcss-selector-parser/releases/tag/v7.0.0)
  makes insertions during iteration safe. No application parser calls need migration;
  the documentation build checks the Typography integration. Retire the override
  once Typography permits a patched parser itself.
- Vercel CLI configuration's zod 4.1.11 to 4.6.7 fixes
  [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5), and
  Vercel routing-utils' path-to-regexp 6.1.0 to 6.3.0 fixes
  [GHSA-9wv6-86v2-598j](https://github.com/advisories/GHSA-9wv6-86v2-598j).
- minimatch 11.0.3 everywhere fixes
  [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) and
  glob 14.0.3 fixes
  [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), both
  published on 30 October 2026 with no patched release inside the majors the
  tree asks for. Both sit under build tooling that the static site never runs
  for visitors; `npm run build` exercises them.

The dependency audit (`npm run audit:dependencies`) fails on any advisory.
The exception it carried for
[GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c)
(sprintf-js, reached through gray-matter's js-yaml 3) was removed after GitHub
withdrew that advisory on 22 October 2026.
