import fs from 'node:fs/promises';
import path from 'node:path';

import process from 'node:process';

import pc from 'picocolors';
import emoji from '../utils/emoji.js';

import formatPath from '../utils/formatPath.js';
import indent from '../utils/indent.js';

export default async function createLauncher(folderPath, output) {

  const smapiPath = path.join(folderPath, 'StardewModdingAPI.exe');
  const launcherPath = path.join(folderPath, `${output}.exe`);

  const stdout = process.stdout;
  const stderr = process.stderr;

  try {
    
    await fs.access(smapiPath);

    const rootDirectory = process.cwd();
  
    const coreDirectory = path.join(rootDirectory, 'core');
    const sourceDirectory = path.join(coreDirectory, 'src');

    const binDirectory = path.join(sourceDirectory, 'bin');
    const launcherBin = path.join(binDirectory, 'launcher.bin');

    await fs.copyFile(launcherBin, launcherPath);

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

    const errorLine = indent(error.message, 1);

    stderr.write('\n');
    stderr.write(errorLine);
    
    stderr.write('\n');
    stderr.write('\n');
    
    process.exit(1);
  }
}