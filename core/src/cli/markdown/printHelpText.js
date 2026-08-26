import process from 'node:process';

import loadMarkdown from './loadMarkdown.js';
import indent from 'smapi-launcher/utils/indent.js';

export default async function printHelpText() {
  
  const stdout = process.stdout;
  
  const helpContent = await loadMarkdown('help.md');

  const indentationPrefix = indent(2);
  
  const lines = helpContent.split('\n');
  const indentedLines = [];

  lines.forEach((line) => {
    
    if (line.length === 0) {
      indentedLines.push(line);
      return;
    }

    indentedLines.push(`${indentationPrefix}${line}`);
  });

  const indentedHelp = indentedLines.join('\n');

  stdout.write('\n');
  stdout.write(indentedHelp);
  
  stdout.write('\n');
  stdout.write('\n');
}
