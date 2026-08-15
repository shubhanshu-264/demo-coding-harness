/**
 * Small assertion helpers for writing exercise cases more expressively.
 */

/** Build a case: expect(fn args...).toReturn(value) */
export function expect(...input) {
  return {
    toReturn(expected) {
      return { input, expected };
    },
  };
}

/** Format a failed result into a readable one-line message. */
export function describeFailure(result) {
  const args = result.input.map((v) => JSON.stringify(v)).join(', ');
  if (result.error) {
    return `case ${result.index}: (${args}) threw ${result.error.message}`;
  }
  return (
    `case ${result.index}: (${args}) expected ` +
    `${JSON.stringify(result.expected)} but got ${JSON.stringify(result.actual)}`
  );
}

/** Summarize a runner report as a short string, listing failures. */
export function summarize(report) {
  const lines = [`${report.passed} passed, ${report.failed} failed`];
  for (const result of report.results) {
    if (!result.pass) lines.push(describeFailure(result));
  }
  return lines.join('\n');
}
