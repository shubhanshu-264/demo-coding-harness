import test from 'node:test';
import assert from 'node:assert/strict';
import { runExercise } from '../src/runner.js';
import { fizzbuzz, cases } from '../exercises/fizzbuzz.js';

test('runs all cases for a correct solution', () => {
  const report = runExercise(fizzbuzz, cases);
  assert.equal(report.passed, cases.length);
  assert.equal(report.failed, 0);
});

test('reports failures for a wrong solution', () => {
  const broken = () => 'Fizz';
  const report = runExercise(broken, cases);
  assert.equal(report.passed, 1);
  assert.equal(report.failed, cases.length - 1);
});

test('a throwing solution counts as failed, not a crash', () => {
  const throwing = () => {
    throw new Error('boom');
  };
  const report = runExercise(throwing, cases);
  assert.equal(report.failed, cases.length);
  assert.ok(report.results[0].error instanceof Error);
});

test('compares structured outputs deeply', () => {
  const pair = (a, b) => ({ a, b: [b] });
  const report = runExercise(pair, [{ input: [1, 2], expected: { a: 1, b: [2] } }]);
  assert.equal(report.passed, 1);
});
