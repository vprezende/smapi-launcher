import fs from 'node:fs/promises';
import path from 'node:path';

import process from 'node:process';
import os from 'node:os';

import pc from 'picocolors';
import emoji from '../utils/emoji.js';

import formatPath from '../utils/formatPath.js';
import indent from '../utils/indent.js';

export default async function revertPatch(folderPath) {

  const stdout = process.stdout;
  const stderr = process.stderr;

  const targetFiles = [
    'StardewModdingAPI.runtimeconfig.json',
    'Stardew Valley.runtimeconfig.json'
  ];

  try {

    await fs.access(folderPath);

    for (const fileName of targetFiles) {
      const filePath = path.join(folderPath, fileName);

      const rawContent = await fs.readFile(filePath, 'utf-8');
      const parsedConfig = JSON.parse(rawContent);

      const runtimeOptions = parsedConfig?.runtimeOptions;
      const configProperties = runtimeOptions?.configProperties;

      if (configProperties) {

        const gcConcurrent = 'System.GC.Concurrent';
        const gcServer = 'System.GC.Server';
        const gcRetainVM = 'System.GC.RetainVM';

        delete configProperties[gcConcurrent];
        delete configProperties[gcServer];
        delete configProperties[gcRetainVM];

        const stringifyOptions = [null, 2];

        const jsonContent = JSON.stringify(parsedConfig, ...stringifyOptions);

        const formattedJson = `${jsonContent}${os.EOL}`;

        const fileData = [filePath, formattedJson];

        await fs.writeFile(...fileData, 'utf-8');
      }
    }

    const displayPath = formatPath(folderPath);

    const statusLabel = `${emoji('check')} Status:`;
    const pathLabel = `${emoji('file_folder')} Path:`;

    const statusMessage = `${pc.green(statusLabel)} Garbage Collection patch removed successfully`;
    const pathMessage = `${pc.green(pathLabel)} ${displayPath}`;

    const statusLine = indent(statusMessage, 1);
    const pathLine = indent(pathMessage, 1);

    stdout.write('\n');
    stdout.write(statusLine);

    stdout.write('\n');
    stdout.write(pathLine);

    stdout.write('\n');
    stdout.write('\n');

  } catch (error) {

    const errorLine = indent(error.message, 1);

    stderr.write('\n');
    stderr.write(errorLine);

    stderr.write('\n');
    stderr.write('\n');

    process.exit(1);
  }
}
