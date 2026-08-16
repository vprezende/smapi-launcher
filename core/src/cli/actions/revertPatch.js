import fs from 'node:fs/promises';
import path from 'node:path';

import process from 'node:process';
import childProcess from 'node:child_process';

import os from 'node:os';
import util from 'node:util';

import pc from 'picocolors';
import emoji from '../utils/emoji.js';

import formatPath from '../utils/formatPath.js';
import indent from '../utils/indent.js';

const execFile = childProcess.execFile;
const execFileAsync = util.promisify(execFile);

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

    let missingCommand = false;

    if (process.platform === 'linux') {

      const galaxyLibraries = [
        'libGalaxy64.so',
        'libGalaxyCSharpGlue.so'
      ];

      for (const libraryName of galaxyLibraries) {
        
        const libraryPath = path.join(folderPath, libraryName);

        const patchArgs = ['--set-execstack', libraryPath];

        try {
          await execFileAsync('patch', patchArgs);
        } catch (error) {
          if (error.code === 'ENOENT') {
            missingCommand = true;
          }
        }
      }
    }

    const hasBlockers = [
      process.platform !== 'linux',
      missingCommand
    ].some(Boolean);

    let statusMessageText = 'Garbage Collector patch removed successfully';

    if (!hasBlocker) {
      statusMessageText = 'Garbage Collector and Multiplayer patches removed successfully';
    }

    const displayPath = formatPath(folderPath);

    const statusLabel = `${emoji('check')} Status:`;
    const pathLabel = `${emoji('file_folder')} Path:`;

    const statusMessage = `${pc.green(statusLabel)} ${statusMessageText}`;
    const pathMessage = `${pc.green(pathLabel)} ${displayPath}`;

    const statusLine = indent(statusMessage, 1);
    const pathLine = indent(pathMessage, 1);

    stdout.write('\n');
    stdout.write(statusLine);

    if (missingCommand) {
      const warningLabel = `${emoji('warning')} Warning:`;

      const notFoundMessage = "'patch' command was not found.";
      const skippedMessage = "• Linux multiplayer fix revert was skipped.";
      const installMessage = "• Install it with: sudo apt-get install patch";

      const warningHeader = `${pc.yellow(warningLabel)} ${notFoundMessage}`;

      const warningLine = indent(warningHeader, 1);
      const skippedLine = indent(skippedMessage, 2);
      const installLine = indent(installMessage, 2);

      stdout.write('\n');
      stdout.write('\n');
      
      stdout.write(warningLine);
      
      stdout.write('\n');
      stdout.write(skippedLine);
      
      stdout.write('\n');
      stdout.write(installLine);
      
      stdout.write('\n');
    }

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
