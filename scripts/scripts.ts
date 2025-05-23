import pkg from '../package.json';

console.log('pnpm cheat-sheet');
console.log('\t-----');

for (const [key, val] of Object.entries(pkg.scripts)) {
  const desc = pkg.scriptDescriptions[key] ?? '';
  console.log(`${key.padEnd(10)} — ${desc}`);
}