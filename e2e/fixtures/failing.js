/** Fixture: a deliberately wrong solution — the harness must flag it. */
export function subtract(a, b) {
  return a + b;
}

export const cases = [
  { input: [5, 2], expected: 3 },
  { input: [1, 1], expected: 0 },
];
