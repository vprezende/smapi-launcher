import fs from 'node:fs';

import path from 'node:path';
import os from 'node:os';

import process from 'node:process';
import childProcess from 'node:child_process';

import pc from 'picocolors';
import emoji from './cli/utils/emoji.js';

import indent from './cli/utils/indent.js';

const execSync = childProcess.execSync;

const sync = (() => {

  const stdout = process.stdout;
  const rootDirectory = process.cwd();

  const packagePath = path.join(rootDirectory, 'package.json');
  const packageContent = fs.readFileSync(packagePath, 'utf8');

  const packageJson = JSON.parse(packageContent);

  const nodeVersionBuffer = execSync('node -p process.versions.node');
  const nodeVersionOutput = nodeVersionBuffer.toString();
  const nodeVersion = nodeVersionOutput.trim();

  const npmVersionBuffer = childProcess.execSync('npm -v');
  const npmVersionOutput = npmVersionBuffer.toString();
  const npmVersion = npmVersionOutput.trim();
  
  packageJson.engines = {
    node: nodeVersion,
    npm: npmVersion
  };

  const stringifyOptions = [null, 2];

  const jsonContent = JSON.stringify(packageJson, ...stringifyOptions);

  const formattedJson = `${jsonContent}${os.EOL}`;
  
  fs.writeFileSync(packagePath, formattedJson);

  const docsDirectory = path.join(rootDirectory, '.github', 'docs');
  const readmePath = path.join(docsDirectory, 'README.md');

  if (!fs.existsSync(readmePath)) {
    return;
  }

  const readmeContent = fs.readFileSync(readmePath, 'utf8');
  const lines = readmeContent.split('\n');

  const nodeDisplayVersion = `v${nodeVersion}`;
  const npmDisplayVersion = `v${npmVersion}`;

  const nodeBadgeLine = `[node-badge]: https://img.shields.io/badge/node-${nodeDisplayVersion}-blue.svg`;
  const npmBadgeLine = `[npm-badge]: https://img.shields.io/badge/npm-${npmDisplayVersion}-blue.svg`;

  const badgeReplacements = {
    '[node-badge]:': nodeBadgeLine,
    '[npm-badge]:': npmBadgeLine
  };

  const updatedLines = lines.map((line) => {
    const key = line.split(' ')[0];
    return badgeReplacements[key] ?? line;
  });

  const updatedReadme = updatedLines.join('\n');
  
  fs.writeFileSync(readmePath, updatedReadme);

  const npmVersionText = indent(npmDisplayVersion, 4);
  
  const syncMessage = pc.green(`${emoji('check')} Synchronized engines with local system:`);
  const nodeMessage = `${pc.cyan('Node.js:')} ${nodeDisplayVersion}`;
  const npmMessage = `${pc.cyan('npm:')} ${npmVersionText}`;

  const syncLine = indent(syncMessage, 1);
  const nodeLine = indent(nodeMessage, 3);
  const npmLine = indent(npmMessage, 3);

  stdout.write('\n');
  stdout.write(syncLine);

  stdout.write('\n');
  stdout.write(nodeLine);
  
  stdout.write('\n');
  stdout.write(npmLine);
  
  stdout.write('\n');
  stdout.write('\n');

})();