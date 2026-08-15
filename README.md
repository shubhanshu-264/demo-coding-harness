# demo-coding-harness

A minimal harness for running coding exercises against test cases.

Define an exercise as a plain function, pair it with a set of cases, and the
harness runs them all and reports which passed.

## Requirements

- Node.js >= 20 (uses the built-in `node:test` runner)

## Running tests

```
npm test
```

## Running an exercise from the CLI

```
node bin/cli.js exercises/fizzbuzz.js
```

Prints a pass/fail summary and exits non-zero if any case fails.

## End-to-end tests

Unit tests (`test/`) exercise modules directly; e2e tests (`e2e/`) run the
real CLI as a subprocess against fixture exercises and assert on exit codes
and printed output.

```
npm run test:e2e   # e2e only
npm run test:all   # unit + e2e
```
