import fs from 'node:fs/promises';
import process from 'node:process';

import pc from 'picocolors';
import emoji from 'smapi-launcher/utils/emoji.js';
import indent from 'smapi-launcher/utils/indent.js';

import formatPath from '../utils/formatPath.js';

import applyMultiplayer from './multiplayer/applyMultiplayer.js';

export default async function applyPatch(folderPath) {

  const platforms = [
    process.platform,
    'win32',
    'linux',
    'darwin',
  ];

  const platform = platforms.at(0);

  const stdout = process.stdout;
  const stderr = process.stderr;

  try {

    await fs.access(folderPath);

    const displayPath = formatPath(folderPath);

    const pathLabel = `${emoji('file_folder')} Path:`;
    const pathMessage = `${pc.green(pathLabel)} ${displayPath}`;
    const pathLine = indent(pathMessage, 1);

    if (platform !== 'linux') {

      const warningLabel = `${emoji('warning')} Warning:`;
      const warningHeader = pc.yellow(warningLabel);

      const targetPlatform = `${platform} platform.`;
      const messageText = `No patches available for ${targetPlatform}`;

      const warningMessage = `${warningHeader} ${messageText}`;

      const warningLine = indent(warningMessage, 1);

      stdout.write('\n');
      stdout.write(warningLine);

      stdout.write('\n');
      stdout.write('\n');

      stdout.write(pathLine);

      stdout.write('\n');
      stdout.write('\n');

      return;
    }

    const mpResult = await applyMultiplayer(folderPath);

    const checkLabel = `${emoji('check')} Status:`;
    const crossLabel = `${emoji('cross')} Status:`;

    const statusLines = new Array();

    if (mpResult === 'SUCCESS') {

      const mpMessage = `${pc.green(checkLabel)} Multiplayer patch applied successfully`;
      const mpLine = indent(mpMessage, 1);

      statusLines.push(mpLine);
    }

    if (mpResult !== 'SUCCESS') {

      const mpMessage = `${pc.red(crossLabel)} Multiplayer patch failed`;
      const mpLine = indent(mpMessage, 1);

      statusLines.push(mpLine);
    }

    for (const statusLine of statusLines) {
      stdout.write('\n');
      stdout.write(statusLine);
    }

    if (mpResult === 'MISSING_FILES_AND_COMMAND') {

      const warningLabel = `${emoji('warning')} Warning:`;

      const skippedMessage = `${emoji('bullet')} Linux Multiplayer patch was skipped.`;
      const missingFileMessage = `${emoji('bullet')} No 'libGalaxy' libraries were found.`;
      const verifyFolderMessage = `${emoji('bullet')} Check if the game path is correct.`;
      const installMessage = `${emoji('bullet')} Install it with: sudo apt-get install patch`;

      const warningHeader = `${pc.yellow(warningLabel)} Required files and 'patch' command were not found.`;

      const warningLine = indent(warningHeader, 1);
      const skippedLine = indent(skippedMessage, 2);
      const missingFileLine = indent(missingFileMessage, 2);
      const verifyFolderLine = indent(verifyFolderMessage, 2);
      const installLine = indent(installMessage, 2);

      stdout.write('\n');
      stdout.write('\n');

      stdout.write(warningLine);

      stdout.write('\n');
      stdout.write(skippedLine);

      stdout.write('\n');
      stdout.write(missingFileLine);

      stdout.write('\n');
      stdout.write(verifyFolderLine);

      stdout.write('\n');
      stdout.write(installLine);
    }

    if (mpResult === 'MISSING_FILES') {

      const warningLabel = `${emoji('warning')} Warning:`;

      const skippedMessage = `${emoji('bullet')} Linux multiplayer patch was skipped.`;
      const missingFileMessage = `${emoji('bullet')} No 'libGalaxy' libraries were found.`;
      const verifyFolderMessage = `${emoji('bullet')} Check if the game path is correct.`;

      const warningHeader = `${pc.yellow(warningLabel)} Required files were not found.`;

      const warningLine = indent(warningHeader, 1);
      const skippedLine = indent(skippedMessage, 2);
      const missingFileLine = indent(missingFileMessage, 2);
      const verifyFolderLine = indent(verifyFolderMessage, 2);

      stdout.write('\n');
      stdout.write('\n');

      stdout.write(warningLine);

      stdout.write('\n');
      stdout.write(skippedLine);

      stdout.write('\n');
      stdout.write(missingFileLine);

      stdout.write('\n');
      stdout.write(verifyFolderLine);
    }

    if (mpResult === 'MISSING_COMMAND') {

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
    }

    stdout.write('\n');
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