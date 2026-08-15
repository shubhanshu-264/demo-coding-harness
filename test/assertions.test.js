import test from 'node:test';
import assert from 'node:assert/strict';
import { expect, describeFailure, summarize } from '../src/assertions.js';
import { runExercise } from '../src/runner.js';

test('expect().toReturn() builds a runner case', () => {
  assert.deepEqual(expect(2, 3).toReturn(5), { input: [2, 3], expected: 5 });
});

test('describeFailure explains a wrong return value', () => {
  const add = () => 0;
  const report = runExercise(add, [expect(2, 3).toReturn(5)]);
  assert.match(describeFailure(report.results[0]), /expected 5 but got 0/);
});

test('summarize lists only failing cases', () => {
  const add = (a, b) => a + b;
  const report = runExercise(add, [
    expect(1, 1).toReturn(2),
    expect(2, 2).toReturn(5),
  ]);
  const summary = summarize(report);
  assert.match(summary, /1 passed, 1 failed/);
  assert.match(summary, /case 1/);
  assert.doesNotMatch(summary, /case 0:/);
});
