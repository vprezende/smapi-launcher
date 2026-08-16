import fs from 'node:fs/promises';
import path from 'node:path';

import process from 'node:process';
import os from 'node:os';
import util from 'node:util';
import childProcess from 'node:child_process';

import pc from 'picocolors';
import emoji from '../utils/emoji.js';

import formatPath from '../utils/formatPath.js';
import indent from '../utils/indent.js';

export default async function applyPatch(folderPath) {

  const execFile = childProcess.execFile;
  const execFileAsync = util.promisify(execFile);

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

      let parsedConfig;

      try {
        await fs.access(filePath);
        const rawContent = await fs.readFile(filePath, 'utf-8');
        parsedConfig = JSON.parse(rawContent);
      } catch {
        
        parsedConfig = new Object();

        const runtimeOptions = new Object();
        runtimeOptions.tfm = 'net6.0';

        const framework = new Object();
        framework.name = 'Microsoft.NETCore.App';
        framework.version = '6.0.0';
        framework.rollForward = 'latestMinor';

        runtimeOptions.includedFrameworks = new Array();
        runtimeOptions.includedFrameworks.push(framework);

        const tieredCompilation = 'System.Runtime.TieredCompilation';

        const configMap = new Map();

        const setMethod = configMap.set;
        const setProperty = setMethod.bind(configMap);

        setProperty(tieredCompilation, false);

        runtimeOptions.configProperties = Object.fromEntries(configMap);

        parsedConfig.runtimeOptions = runtimeOptions;
      }

      parsedConfig.runtimeOptions ??= new Object();

      const runtimeOptions = parsedConfig.runtimeOptions;

      runtimeOptions.configProperties ??= new Object();
      
      const configProperties = runtimeOptions.configProperties;

      const gcConcurrent = 'System.GC.Concurrent';
      const gcServer = 'System.GC.Server';
      const gcRetainVM = 'System.GC.RetainVM';

      const configMap = new Map(
        Object.entries(
          configProperties
        )
      );

      const setMethod = configMap.set;
      
      const setProperty = setMethod.bind(configMap);

      setProperty(gcConcurrent, true);
      setProperty(gcServer, false);
      setProperty(gcRetainVM, true);

      runtimeOptions.configProperties = Object.fromEntries(configMap);

      const stringifyOptions = [null, 2];

      const jsonContent = JSON.stringify(parsedConfig, ...stringifyOptions);

      const formattedJson = `${jsonContent}${os.EOL}`;

      const fileData = [filePath, formattedJson];

      await fs.writeFile(...fileData, 'utf-8');
    }

    let missingCommand = false;

    if (process.platform === 'linux') {

      const galaxyLibraries = [
        'libGalaxy64.so',
        'libGalaxyCSharpGlue.so'
      ];

      for (const libraryName of galaxyLibraries) {
        const libraryPath = path.join(folderPath, libraryName);

        const patchArgs = ['--clear-execstack', libraryPath];

        try {
          await execFileAsync("patch", patchArgs);
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

    let statusMessageText = 'Garbage Collector patch applied successfully';

    if (!hasBlocker) {
      statusMessageText = 'Garbage Collector and Multiplayer patches applied successfully';
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
      const skippedMessage = "• Linux multiplayer fix was skipped.";
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
