# Dependency review

The October 2026 review updates MCP SDK 1.30.0 to 1.32.1,
DOMPurify 3.4.15 to 3.4.17, http-cache-semantics 4.2.0 to 4.3.0,
Sharp 0.35.4 to 0.35.5, smol-toml 1.8.0 to 1.9.1 and
source-map-js 1.2.1 to 1.2.2.

Two temporary overrides keep the existing documentation framework:

- Mermaid's KaTeX 0.16.47 to 0.18.2 fixes
  [GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7).
  The public rendering API is retained; verify math and diagrams in the built site.
- Typography's postcss-selector-parser 6.0.10 to 7.1.7 fixes
  [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf).
  [The 7.0.0 breaking change](https://github.com/postcss/postcss-selector-parser/releases/tag/v7.0.0)
  makes insertions during iteration safe. No application parser calls need migration;
  the documentation build checks the Typography integration. Retire the override
  once Typography permits a patched parser itself.

## Temporary unresolved advisory

[GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c)
affects sprintf-js through 1.1.3 and has no published patched version.
It arrives through gray-matter → js-yaml 3 → argparse.
The vulnerable formatter accepts attacker-controlled precision in format strings;
this site's frontmatter is parsed through js-yaml's library API, while argparse
and sprintf-js belong to its command-line argument/help code. The deployed site
is static and does not expose this CLI to visitors.

Do not replace js-yaml 3 with a breaking major override: gray-matter still calls
its legacy safeLoad API. The exception expires on **20 November 2026**.
Before then, check for an upstream release, verify the dependency path again,
and remove the exception when a compatible fix is available. The dependency
audit fails for other advisories and after expiry. This is a documented residual
risk, not a claim that the dependency is patched.
