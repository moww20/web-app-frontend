#!/usr/bin/env bun
/**
 * Abort if not running with Bun. This enforces `bun run dev` over npm/yarn.
 */
if (typeof Bun === 'undefined') {
  console.error('\nThis project is configured to run with Bun only.');
  console.error('Please use:');
  console.error('  bun install');
  console.error('  bun run dev');
  process.exit(1);
}

// Optional: warn if unsupported Node package managers are detected
const fs = await import('fs');
const lockfiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
const found = lockfiles.filter((f) => fs.existsSync(f));
if (found.length > 0) {
  console.warn(`Warning: Detected lockfiles not used by Bun: ${found.join(', ')}`);
  console.warn('Consider removing them to avoid confusion. Bun uses bun.lock');
}

console.log('Running dev with Bun ✓');

