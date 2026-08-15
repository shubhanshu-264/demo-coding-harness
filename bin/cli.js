#!/usr/bin/env node
/**
 * CLI: run an exercise module against its own cases.
 *
 *   node bin/cli.js exercises/fizzbuzz.js
 *
 * The module must export one function (the solution) and a `cases` array.
 * Exits 0 when all cases pass, 1 otherwise.
 */
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { runExercise } from '../src/runner.js';
import { summarize } from '../src/assertions.js';

const target = process.argv[2];
if (!target) {
  console.error('usage: cli.js <exercise-module>');
  process.exit(2);
}

const mod = await import(pathToFileURL(resolve(target)).href);
const fn = Object.values(mod).find((v) => typeof v === 'function');
if (!fn || !Array.isArray(mod.cases)) {
  console.error('exercise module must export a function and a cases array');
  process.exit(2);
}

const report = runExercise(fn, mod.cases);
console.log(summarize(report));
process.exit(report.failed === 0 ? 0 : 1);
