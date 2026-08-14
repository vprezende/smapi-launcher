#!/usr/bin/env node

import printHelpText from './markdown/printHelpText.js';

import parseInput from './input/parseInput.js';

import createLauncher from './launcher/createLauncher.js';

const main = (async () => {
  
  const parsed = await parseInput();
  const options = parsed.values;

  if (options.help) {
    await printHelpText();
    process.exit(0);
  }

  if (!options.path) {
    await printHelpText();
    process.exit(0);
  }

  if (!options.output) {
    await printHelpText();
    process.exit(0);
  }

  await createLauncher(
    options.path,
    options.output
  );

})();