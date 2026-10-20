import { spawnSync } from 'node:child_process';

// No upstream fix exists. This dependency is used by js-yaml's CLI help
// formatter, not by gray-matter's YAML API. Reassess by this date, or sooner
// when npm reports a patch. See SECURITY.md.
const exception = 'https://github.com/advisories/GHSA-hp3w-g68c-fv3c';
const expires = Date.parse('2026-11-20T00:00:00Z');
const result = spawnSync('npm', ['audit', '--json'], { encoding: 'utf8' });
if (result.error || ![0, 1].includes(result.status)) {
  console.error('Dependency audit could not run.');
  process.exit(1);
}
let audit;
try {
  audit = JSON.parse(result.stdout);
} catch {
  console.error('Dependency audit returned invalid JSON.');
  process.exit(1);
}
if (audit.error || !audit.vulnerabilities) {
  console.error('Dependency audit did not return vulnerability data.');
  process.exit(1);
}
const failures = [];
for (const [name, item] of Object.entries(audit.vulnerabilities)) {
  for (const advisory of item.via) {
    // Indirect entries point at another package, which is checked separately.
    if (typeof advisory === 'string') continue;
    // npm sometimes labels upgrading the parent as a fix even when that
    // parent still uses the same unpatched formatter. Do not trust that flag.
    if (advisory.url === exception && name === 'sprintf-js' && Date.now() < expires) continue;
    failures.push(`${name}: ${advisory.url}`);
  }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('No unreviewed dependency advisories (see SECURITY.md for the temporary exception).');
