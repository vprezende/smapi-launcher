import fs from 'node:fs/promises';
import process from 'node:process';

import pc from 'picocolors';
import emoji from '../utils/emoji.js';

import formatPath from '../utils/formatPath.js';
import indent from '../utils/indent.js';

import applyGarbageCollector from './garbageCollector/applyGarbageCollector.js';
import applyMultiplayer from './multiplayer/applyMultiplayer.js';

export default async function applyPatch(folderPath) {

  const plaforms = [
    process.platform,
    'win32',
    'linux',
    'darwin',
  ];

  const platform = plaforms.at(0);

  const stdout = process.stdout;
  const stderr = process.stderr;

  try {

    await fs.access(folderPath);

    await applyGarbageCollector(folderPath);

    let missingCommand = false;

    if (platform === 'linux') {
      missingCommand = await applyMultiplayer(folderPath);
    }

    const checkLabel = `${emoji('check')} Status:`;
    const crossLabel = `${emoji('cross')} Status:`;

    const statusLines = new Array();

    const gcMessage = `${pc.green(checkLabel)} Garbage Collector patch applied successfully`;
    const gcLine = indent(gcMessage, 1);

    statusLines.push(gcLine);

    const isMultiplayerSuccess = [
      platform === 'linux',
      !missingCommand
    ].every(Boolean);

    if (isMultiplayerSuccess) {

      const mpMessage = `${pc.green(checkLabel)} Multiplayer patch applied successfully`;
      const mpLine = indent(mpMessage, 1);

      statusLines.push(mpLine);
    }

    const isMultiplayerFailed = [
      platform === 'linux',
      missingCommand
    ].every(Boolean);

    if (isMultiplayerFailed) {

      const mpMessage = `${pc.red(crossLabel)} Multiplayer patch failed`;
      const mpLine = indent(mpMessage, 1);

      statusLines.push(mpLine);
    }

    const displayPath = formatPath(folderPath);

    const pathLabel = `${emoji('file_folder')} Path:`;
    const pathMessage = `${pc.green(pathLabel)} ${displayPath}`;
    const pathLine = indent(pathMessage, 1);

    for (const statusLine of statusLines) {
      stdout.write('\n');
      stdout.write(statusLine);
    }

    if (missingCommand) {
      
      const warningLabel = `${emoji('warning')} Warning:`;

      const skippedMessage = `${emoji('bullet')} Linux multiplayer fix was skipped.`;
      const installMessage = `${emoji('bullet')} Install it with: sudo apt-get install patch`;

      const warningHeader = `${pc.yellow(warningLabel)} 'patch' command was not found.`;

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

    if (isMultiplayerSuccess) {
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
