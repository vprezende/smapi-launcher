import fs from 'node:fs/promises';
import path from 'node:path';

import process from 'node:process';

import pc from 'picocolors';
import emoji from '../../utils/emoji.js';

import formatPath from '../utils/formatPath.js';
import indent from 'smapi-launcher/utils/indent.js';

export default async function createLauncher(folderPath, output) {

  const smapiPath = path.join(folderPath, 'StardewModdingAPI.exe');
  const launcherPath = path.join(folderPath, `${output}.exe`);

  const stdout = process.stdout;
  const stderr = process.stderr;

  try {
    
    await fs.access(smapiPath);

    const meta = import.meta;

    const launcherBinUrl = new URL('../../bin/launcher.bin', meta.url);

    await fs.copyFile(launcherBinUrl, launcherPath);

    const displayPath = formatPath(launcherPath);

    const statusLabel = `${emoji('check')} Status:`;
    const pathLabel = `${emoji('file_folder')} Path:`

    const statusMessage = `${pc.green(statusLabel)} Launcher created successfully`;
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

    if (error.code !== 'ENOENT') {

      const errorLine = indent(error.message, 1);

      stderr.write('\n');
      stderr.write(errorLine);

      stderr.write('\n');
      stderr.write('\n');

      process.exit(1);
    }
    
    const displayPath = formatPath(folderPath);
    
    const statusLabel = `${emoji('cross')} Status:`;
    const warningLabel = `${emoji('warning')} Warning:`;
    const pathLabel = `${emoji('file_folder')} Path:`;

    const missingFileMessage = `${emoji('bullet')} 'StardewModdingAPI.exe' is missing from the game folder.`;
    const installMessage = `${emoji('bullet')} Only Windows/Proton (.exe) installations are supported.`;

    const statusMessage = `${pc.red(statusLabel)} Launcher creation failed`;
    const warningHeader = `${pc.yellow(warningLabel)} Required file was not found.`;
    const pathMessage = `${pc.green(pathLabel)} ${displayPath}`;

    const statusLine = indent(statusMessage, 1);

    const warningLine = indent(warningHeader, 1);
    const missingFileLine = indent(missingFileMessage, 2);
    const installLine = indent(installMessage, 2);
    
    const pathLine = indent(pathMessage, 1);

    stderr.write('\n');
    stderr.write(statusLine);

    stderr.write('\n');
    stderr.write('\n');

    stderr.write(warningLine);

    stderr.write('\n');
    stderr.write(missingFileLine);

    stderr.write('\n');
    stderr.write(installLine);

    stderr.write('\n');
    stderr.write('\n');

    stderr.write(pathLine);

    stderr.write('\n');
    stderr.write('\n');

    process.exit(1);
  }
}