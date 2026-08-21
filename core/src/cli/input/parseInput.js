import util from 'node:util';
import process from 'node:process';

import createOption from './createOption.js';
import indent from '../utils/indent.js';

export default async function parseInput(args) {

  const stderr = process.stderr;
  
  const argv = process.argv;

  const rawArgs = args ?? argv.slice(2);

  try {

    const options = new Object();

    options.path = createOption('string', 'p');
    options.output = createOption('string', 'o');
    options.version = createOption('boolean', 'v');
    options.help = createOption('boolean', 'h');

    const parseConfig = new Object();
    
    parseConfig.args = rawArgs;
    parseConfig.options = options;
    parseConfig.allowPositionals = true;

    const parsedArgs = util.parseArgs(parseConfig);

    const parsedInput = new Object();
    
    parsedInput.values = parsedArgs.values;
    parsedInput.positionals = parsedArgs.positionals;

    return parsedInput;

  } catch (error) {

    const badFlags = rawArgs
      .filter((arg) => arg.startsWith('-'))
      .filter((arg) => !arg.startsWith('--'))
      .filter((arg) => arg.length > 2);

    const [badFlag] = badFlags;

    const positionalError = 'ERR_PARSE_ARGS_UNEXPECTED_POSITIONAL';
    const unknownError = `Unknown option: ${badFlag}`;

    const errorMessages = new Object();

    errorMessages[positionalError] = unknownError;

    const rawMessage = error.message;

    const [firstSentence] = rawMessage.split('.');

    const optionReplacement = ["Unknown option '", 'Unknown option: '];
    const quoteReplacement = [/'/g, ''];

    const cleanMessage = firstSentence
      .replace(...optionReplacement)
      .replace(...quoteReplacement);

    const errorMessage = errorMessages[rawMessage] ?? cleanMessage;
    
    const errorLine = indent(errorMessage, 1);

    stderr.write('\n');
    stderr.write(errorLine);

    stderr.write('\n');
    stderr.write('\n');

    process.exit(1);
  }
}
