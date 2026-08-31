import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import process from 'node:process';
import childProcess from 'node:child_process';

import pc from 'picocolors';
import emoji from 'smapi-launcher/utils/emoji.js';

import shieldBadge from './shieldBadge.js';

import indent from 'smapi-launcher/utils/indent.js';

const execSync = childProcess.execSync;

void (async () => {

  const stdout = process.stdout;
  const rootDirectory = process.cwd();

  const packagePath = path.join(rootDirectory, 'package.json');
  const packageContent = fs.readFileSync(packagePath, 'utf8');

  const packageJson = JSON.parse(packageContent);

  const packageName = packageJson.name;
  const packageVersion = packageJson.version;
  const registryUrl = `https://registry.npmjs.org/${packageName}`;
  let latestPublishedVersion = null;

  try {

    const registryResponse = await fetch(registryUrl);
    
    if (registryResponse.ok) {

      const registryData = await registryResponse.json();
      
      const distTagsProperty = registryData['dist-tags'];
      
      const distTags = distTagsProperty ?? {};
      
      latestPublishedVersion = distTags.latest ?? null;

    }
  } catch {
    latestPublishedVersion = null;
  }

  let statusText = 'unreleased';

  if (latestPublishedVersion) {
    statusText = `bumped from v${latestPublishedVersion}`;
  }

  if (latestPublishedVersion === packageVersion) {
    statusText = 'already published';
  }

  const displayStatus = `(${statusText})`;

  const versionStatus = pc.yellow(displayStatus);

  const nodeVersionBuffer = execSync('node -p process.versions.node');
  
  const nodeVersionOutput = nodeVersionBuffer.toString();
  const nodeVersion = nodeVersionOutput.trim();

  const npmVersionBuffer = childProcess.execSync('npm -v');
  
  const npmVersionOutput = npmVersionBuffer.toString();
  const npmVersion = npmVersionOutput.trim();

  const engines = new Object();
  engines.node = nodeVersion;
  engines.npm = npmVersion;

  packageJson.engines = engines;

  const stringifyOptions = [null, 2];

  const jsonContent = JSON.stringify(packageJson, ...stringifyOptions);

  const formattedJson = `${jsonContent}${os.EOL}`;

  fs.writeFileSync(packagePath, formattedJson);

  const githubDirectory = path.join(rootDirectory, '.github');
  const docsDirectory = path.join(githubDirectory, 'docs');

  const readmePath = path.join(docsDirectory, 'README.md');

  if (fs.existsSync(readmePath)) {
    
    const readmeContent = fs.readFileSync(readmePath, 'utf8');

    const lines = readmeContent.split('\n');

    const versionDisplayVersion = `v${packageVersion}`;
    const nodeDisplayVersion = `v${nodeVersion}`;
    const npmDisplayVersion = `v${npmVersion}`;

    const versionBadgeLine = shieldBadge('version', versionDisplayVersion, 'blue');
    const nodeBadgeLine = shieldBadge('node', nodeDisplayVersion, 'blue');
    const npmBadgeLine = shieldBadge('npm', npmDisplayVersion, 'blue');

    const badges = new Map();

    const versionBadge = '[version-badge]:';
    const nodeBadge = '[node-badge]:';
    const npmBadge = '[npm-badge]:';

    badges.set(versionBadge, versionBadgeLine);
    badges.set(nodeBadge, nodeBadgeLine);
    badges.set(npmBadge, npmBadgeLine);

    const updatedLines = lines.map((line) => {
      const key = line.split(' ')[0];
      const updatedLine = badges.get(key) ?? line;
      return updatedLine;
    });

    const updatedReadme = updatedLines.join('\n');

    fs.writeFileSync(readmePath, updatedReadme);
  }

  const nodeDisplayVersion = `v${nodeVersion}`;
  const npmDisplayVersion = `v${npmVersion}`;

  const syncLabel = `${emoji('check')} Synchronized engines with local system:`;

  const versionLabel = pc.cyan('Version:');
  const nodeLabel = pc.cyan('Node.js:');
  const npmLabel = pc.cyan('npm:');

  const syncMessage = pc.green(syncLabel);

  const versionMessage = `${versionLabel} v${packageVersion} ${versionStatus}`;
  const nodeMessage = `${nodeLabel} ${nodeDisplayVersion}`;

  const npmVersionText = indent(npmDisplayVersion, 4);
  const npmMessage = `${npmLabel} ${npmVersionText}`;

  const syncLine = indent(syncMessage, 1);
  const versionLine = indent(versionMessage, 3);
  const nodeLine = indent(nodeMessage, 3);
  const npmLine = indent(npmMessage, 3);

  stdout.write('\n');
  stdout.write(syncLine);

  stdout.write('\n');
  stdout.write(versionLine);

  stdout.write('\n');
  stdout.write(nodeLine);

  stdout.write('\n');
  stdout.write(npmLine);

  stdout.write('\n');
  stdout.write('\n');

})();
