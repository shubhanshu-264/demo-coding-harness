import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Run the real CLI as a subprocess, capturing exit code and output. */
function runCli(...args) {
  try {
    const stdout = execFileSync(process.execPath, [join(root, 'bin', 'cli.js'), ...args], {
      cwd: root,
      encoding: 'utf8',
    });
    return { code: 0, output: stdout };
  } catch (err) {
    return { code: err.status, output: `${err.stdout ?? ''}${err.stderr ?? ''}` };
  }
}

test('exits 0 and reports all passes for a correct exercise', () => {
  const { code, output } = runCli('e2e/fixtures/passing.js');
  assert.equal(code, 0);
  assert.match(output, /3 passed, 0 failed/);
});

test('exits 1 and lists each failing case for a wrong exercise', () => {
  const { code, output } = runCli('e2e/fixtures/failing.js');
  assert.equal(code, 1);
  assert.match(output, /0 passed, 2 failed/);
  assert.match(output, /case 0: \(5, 2\) expected 3 but got 7/);
  assert.match(output, /case 1: \(1, 1\) expected 0 but got 2/);
});

test('exits 2 with usage when no module is given', () => {
  const { code, output } = runCli();
  assert.equal(code, 2);
  assert.match(output, /usage/);
});
