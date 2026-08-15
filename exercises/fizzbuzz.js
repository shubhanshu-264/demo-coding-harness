/**
 * Sample exercise: classic FizzBuzz for a single number.
 */
export function fizzbuzz(n) {
  if (n % 15 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return String(n);
}

export const cases = [
  { input: [1], expected: '1' },
  { input: [3], expected: 'Fizz' },
  { input: [5], expected: 'Buzz' },
  { input: [15], expected: 'FizzBuzz' },
  { input: [98], expected: '98' },
];
