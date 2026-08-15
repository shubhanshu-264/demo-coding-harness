/** Fixture: a correct solution — every case passes. */
export function add(a, b) {
  return a + b;
}

export const cases = [
  { input: [1, 2], expected: 3 },
  { input: [-1, 1], expected: 0 },
  { input: [0.5, 0.25], expected: 0.75 },
];
