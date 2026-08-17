import fs from 'node:fs';
import path from 'node:path';

import process from 'node:process';
import childProcess from 'node:child_process';

import pc from 'picocolors';
import emoji from './cli/utils/emoji.js';

import indent from './cli/utils/indent.js';

const main = (() => {
  
  const stdout = process.stdout;

  const rootDirectory = process.cwd();

  const coreDirectory = path.join(rootDirectory, 'core');
  const sourceDirectory = path.join(coreDirectory, 'src');

  const binDirectory = path.join(sourceDirectory, 'bin');
  const binPath = path.join(binDirectory, 'launcher.bin');

  if (!fs.existsSync(binDirectory)) {
    fs.mkdirSync(binDirectory);
  }

  const targetDirectory = path.join(coreDirectory, 'target');
  const releaseDirectory = path.join(targetDirectory, 'x86_64-pc-windows-gnu');
  const releaseBinDirectory = path.join(releaseDirectory, 'release');

  const exePath = path.join(releaseBinDirectory, 'smapi_launcher.exe');
  const manifestPath = path.join(coreDirectory, 'Cargo.toml');

  const buildArgs = ['build', '--release'];
  const manifestArgs = ['--manifest-path', manifestPath];

  const targetArgs = ['--target', 'x86_64-pc-windows-gnu'];

  const compilerArgs = [
    ...buildArgs,
    ...manifestArgs,
    ...targetArgs
  ];

  const compilationMessage = pc.cyan(`${emoji('gear')} Compiling Rust binary`);

  const compilationLine = indent(compilationMessage, 1);

  stdout.write('\n');
  stdout.write(compilationLine);
  
  stdout.write('\n');
  stdout.write('\n');

  childProcess.spawnSync(
    'cargo',
    compilerArgs, {
      stdio: 'inherit'
    }
  );

  fs.copyFileSync(exePath, binPath);

  const buildLabel = `${emoji('check')} Build complete:`;

  const buildMessage = `${pc.green(buildLabel)} core/src/bin/launcher.bin`;

  const buildLine = indent(buildMessage, 1);

  stdout.write('\n');
  stdout.write(buildLine);

  stdout.write('\n');
  stdout.write('\n');

})();
