/**
 * Standalone test for mapping helpers.
 * Run with: node scripts/test-mapping.js
 *
 * Functions are inlined to avoid ESM/CJS import complications.
 */

// ── Inlined from src/mapping.ts ──────────────────────────────────

function percentToStep(percent, min, max) {
  if (percent <= 0) return min;
  const range = max - min;
  const step = min + Math.min(Math.floor(percent * range / 100), range);
  return Math.min(Math.max(step, min), max);
}

function stepToPercent(step, min, max) {
  if (step <= 0) return 0;
  const clamped = Math.min(Math.max(step, min), max);
  const steps = max - min + 1;
  return Math.round(((clamped - min + 1) / steps) * 100);
}

// ── Test runner ──────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(label, actual, expected) {
  if (actual === expected) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}: expected ${expected}, got ${actual}`);
    failed++;
  }
}

console.log('── percentToStep (min=1, max=6) ──');
assert('0% → 1', percentToStep(0, 1, 6), 1);
assert('1% → 1', percentToStep(1, 1, 6), 1);
assert('17% → 1', percentToStep(17, 1, 6), 1);
assert('18% → 1', percentToStep(18, 1, 6), 1);
assert('20% → 2', percentToStep(20, 1, 6), 2);
assert('50% → 3', percentToStep(50, 1, 6), 3);
assert('100% → 6', percentToStep(100, 1, 6), 6);

console.log('\n── stepToPercent (min=1, max=6) ──');
assert('step 1 → 17%', stepToPercent(1, 1, 6), 17);
assert('step 2 → 33%', stepToPercent(2, 1, 6), 33);
assert('step 3 → 50%', stepToPercent(3, 1, 6), 50);
assert('step 6 → 100%', stepToPercent(6, 1, 6), 100);
assert('step 0 → 0%', stepToPercent(0, 1, 6), 0);

console.log('\n── percentToStep (min=1, max=3) ──');
assert('33% → 1', percentToStep(33, 1, 3), 1);
assert('49% → 1', percentToStep(49, 1, 3), 1);
assert('50% → 2', percentToStep(50, 1, 3), 2);
assert('67% → 2', percentToStep(67, 1, 3), 2);
assert('99% → 2', percentToStep(99, 1, 3), 2);
assert('100% → 3', percentToStep(100, 1, 3), 3);

console.log('\n── roundtrip (min=1, max=6) ──');
for (let step = 1; step <= 6; step++) {
  const pct = stepToPercent(step, 1, 6);
  const back = percentToStep(pct, 1, 6);
  assert(`step ${step} → ${pct}% → step ${back}`, back, step);
}

console.log(`\n${'═'.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
