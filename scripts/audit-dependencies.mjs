import { spawnSync } from 'node:child_process';

// Fails on any advisory npm audit reports. Temporary exceptions, when one is
// unavoidable, belong here with an expiry date and a note in SECURITY.md.
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
    failures.push(`${name}: ${advisory.url}`);
  }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('No dependency advisories.');
