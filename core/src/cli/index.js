#!/usr/bin/env node

import process from 'node:process';

import printHelpText from './markdown/printHelpText.js';

import parseInput from './input/parseInput.js';

import createLauncher from './actions/createLauncher.js';
import applyPatch from './actions/applyPatch.js';
import revertPatch from './actions/revertPatch.js';

import indent from './utils/indent.js';

const main = (async () => {
  
  const stderr = process.stderr;

  const parsed = await parseInput();

  const options = parsed.values;
  
  const positionals = parsed.positionals ?? [];
  const command = positionals[0];

  if (options.help) {
    await printHelpText();
    process.exit(0);
  }

  if (command === 'patch') {

    if (options.output) {

      const errorMessage = "Error: Option '-o, --output' is not supported with the 'patch' command.";
      const errorLine = indent(errorMessage, 1);
      
      stderr.write('\n');
      stderr.write(errorLine);

      stderr.write('\n');
      stderr.write('\n');

      process.exit(1);
    }

    if (!options.path) {
      await printHelpText();
      process.exit(0);
    }

    await applyPatch(options.path);
    process.exit(0);
  }

  if (command === 'unpatch') {

    if (options.output) {

      const errorMessage = "Error: Option '-o, --output' is not supported with the 'unpatch' command.";
      const errorLine = indent(errorMessage, 1);
      
      stderr.write('\n');
      stderr.write(errorLine);

      stderr.write('\n');
      stderr.write('\n');

      process.exit(1);
    }

    if (!options.path) {
      await printHelpText();
      process.exit(0);
    }

    await revertPatch(options.path);
    process.exit(0);
  }

  if (command) {

    const errorMessage = `Unknown command: ${command}`;
    const errorLine = indent(errorMessage, 1);
    
    stderr.write('\n');
    stderr.write(errorLine);

    stderr.write('\n');
    stderr.write('\n');

    process.exit(1);
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