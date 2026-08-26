import fs from 'node:fs';
import path from 'node:path';

import process from 'node:process';
import childProcess from 'node:child_process';

import * as core from '@actions/core';

import pc from 'picocolors';
import emoji from 'smapi-launcher/utils/emoji.js';

import indent from 'smapi-launcher/utils/indent.js';

const spawnSync = childProcess.spawnSync;

void (async () => {

  const stdout = process.stdout;
  const stderr = process.stderr;
  const env = process.env;

  const githubActions = env.GITHUB_ACTIONS;

  if (githubActions !== 'true') {

    const warningLabel = `${emoji('warning')} Warning:`;
    
    const warningMessage = `${pc.yellow(warningLabel)} OIDC requires GitHub Actions.`;

    const warningLine = indent(warningMessage, 1);

    stderr.write('\n');
    stderr.write(warningLine);

    stderr.write('\n');
    stderr.write('\n');

    process.exit(1);
  }

  const rootDirectory = process.cwd();
  const packagePath = path.join(rootDirectory, 'package.json');

  const packageContent = fs.readFileSync(packagePath, 'utf8');
  const packageData = JSON.parse(packageContent);

  const packageName = packageData.name;
  const githubRunId = process.env.GITHUB_RUN_ID;

  try {
    // Retrieve OIDC Token directly via @actions/core
    const registryUrl = 'https://registry.npmjs.org';
    const tokenEndpoint = `${registryUrl}/-/npm/v1/tokens`;

    const jwt = await core.getIDToken(registryUrl);

    // Decode repository and reference metadata from payload
    const jwtParts = jwt.split('.');
    const base64Payload = jwtParts[1];

    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const payloadJson = payloadBuffer.toString();

    const oidcPayload = JSON.parse(payloadJson);

    const targetRepo = oidcPayload.repository;
    const targetRef = oidcPayload.ref;

    // Perform OIDC handshake with the NPM token endpoint
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ 
        token: jwt
      })
    };

    const handshakeResponse = await fetch(tokenEndpoint, requestOptions);

    if (!handshakeResponse.ok) {

      const errorData = await handshakeResponse.json();
      let reason = errorData.message;

      if (!reason) {
        reason = `HTTP ${handshakeResponse.status}`;
      }

      const errorMessage = `NPM rejected OIDC handshake (${reason})`;

      throw new Error(errorMessage);
    }

    const successLabel = `${emoji('check')} Success:`;

    const successHeader = pc.green(successLabel);

    const packageLabel = pc.bold(packageName);
    const repoLabel = pc.cyan(targetRepo);
    const tagLabel = pc.cyan(targetRef);

    const authorizationPrefix = 'OIDC Handshake authorized by NPM for';
    
    const authorizationMessage = `${authorizationPrefix} ${packageLabel}`;

    const repoContext = `(${repoLabel} at ${tagLabel})`;

    const verifiedDescription = `${authorizationMessage} ${repoContext}`;
    const verifiedMessage = `${successHeader} ${verifiedDescription}`;
    
    const verifiedLine = indent(verifiedMessage, 1);

    stdout.write('\n');
    stdout.write(verifiedLine);

    stdout.write('\n');
    stdout.write('\n');

  } catch (error) {

    const warningLabel = `${emoji('warning')} Warning:`;
    const warningHeader = pc.yellow(warningLabel);

    const errorDetails = `(${error.message})`;

    const failureMessage = `OIDC Handshake failed ${errorDetails}.`;
    const cancelMessage = 'Canceling run gracefully.';

    const warningDescription = `${failureMessage} ${cancelMessage}`;
    const warningMessage = `${warningHeader} ${warningDescription}`;
    
    const warningLine = indent(warningMessage, 1);

    stderr.write('\n');
    stderr.write(warningLine);

    stderr.write('\n');
    stderr.write('\n');

    if (githubRunId) {

      const cancelCommand = ['run', 'cancel'];

      const cancelArguments = [
        ...cancelCommand, 
        githubRunId
      ];

      const cancelProcess = ['gh', cancelArguments];

      const spawnOptions = {
        stdio: 'ignore'
      };

      spawnSync(...cancelProcess, spawnOptions);
    }

    process.exit(1);
  }
})();