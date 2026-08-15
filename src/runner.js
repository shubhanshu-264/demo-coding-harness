/**
 * Run an exercise function against a list of cases.
 *
 * Each case is { input, expected } where input is an array of arguments.
 * Returns { passed, failed, results } where results holds one entry per
 * case with the actual output and a pass flag.
 */
export function runExercise(fn, cases) {
  const results = cases.map(({ input, expected }, index) => {
    let actual;
    let error = null;
    try {
      actual = fn(...input);
    } catch (err) {
      error = err;
    }
    const pass = error === null && deepEqual(actual, expected);
    return { index, input, expected, actual, error, pass };
  });

  return {
    passed: results.filter((r) => r.pass).length,
    failed: results.filter((r) => !r.pass).length,
    results,
  };
}

function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => deepEqual(a[key], b[key]));
}
