import runTest262 from '@js-temporal/temporal-test262-runner';

const result = runTest262({
  test262Dir: 'test262',
  polyfillCodeFile: 'script.js',
  expectedFailureFiles: ['test/expected-failures.txt'],
  testGlobs: process.argv.slice(2)
});

process.exit(result ? 0 : 1);
