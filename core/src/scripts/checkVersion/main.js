import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import childProcess from 'node:child_process';

import pc from 'picocolors';
import emoji from 'smapi-launcher/utils/emoji.js';
import indent from 'smapi-launcher/utils/indent.js';

const execSync = childProcess.execSync;

void (() => {

  const stdout = process.stdout;
  const rootDirectory = process.cwd();

  const packagePath = path.join(rootDirectory, 'package.json');
  const packageContent = fs.readFileSync(packagePath);

  const packageJson = JSON.parse(packageContent);

  const packageName = packageJson.name;
  const packageVersion = packageJson.version;

  const targetPackage = `${packageName}@${packageVersion}`;

  let isPublished = false;

  try {
    const viewPackage = `npm view ${targetPackage}`;
    const command = `${viewPackage} version`;

    const execOptions = { 
      stdio: 'pipe' 
    };

    const outputBuffer = execSync(command, execOptions);

    const outputString = outputBuffer.toString();
    const outputValue = outputString.trim();

    if (outputValue === packageVersion) {
      isPublished = true;
    }

  } catch {
    isPublished = false;
  }

  const versionText = pc.bold(packageVersion);
  const packageText = pc.bold(packageName);

  const versionLabel = `Version ${versionText}`;
  const packageTarget = `${versionLabel} of ${packageText}`;

  const env = process.env;
  const githubOutput = env.GITHUB_OUTPUT;

  const outputLine = `is_published=${isPublished}`;

  if (githubOutput) {
    fs.appendFileSync(githubOutput, outputLine);
    fs.appendFileSync(githubOutput, '\n');
  }

  if (!isPublished) {

    const warningLabel = `${emoji('warning')} Warning:`;
    const warningHeader = pc.yellow(warningLabel);

    const messageText = `${packageTarget} was not found on NPM.`;
    const warningMessage = `${warningHeader} ${messageText}`;
    
    const warningLine = indent(warningMessage, 1);

    stdout.write('\n');
    stdout.write(warningLine);

    stdout.write('\n');
    stdout.write('\n');

    return;
  }

  const successLabel = `${emoji('check')} Success:`;
  const successHeader = pc.green(successLabel);

  const messageText = `${packageTarget} is already published on NPM.`;
  const successMessage = `${successHeader} ${messageText}`;
  
  const successLine = indent(successMessage, 1);

  stdout.write('\n');
  stdout.write(successLine);

  stdout.write('\n');
  stdout.write('\n');

})();
