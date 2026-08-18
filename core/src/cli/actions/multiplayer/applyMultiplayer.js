import fs from 'node:fs';
import path from 'node:path';
import childProcess from 'node:child_process';

const spawnSync = childProcess.spawnSync;

export default async function applyMultiplayer(folderPath) {

  const galaxyLibraries = [
    'libGalaxy64.so',
    'libGalaxyCSharpGlue.so'
  ];

  let patchStatus = 'SUCCESS';
  const command = 'patch';

  const existingLibraries = galaxyLibraries.filter(
    (fileName) => {
      const libraryPath = path.join(folderPath, fileName);
      return fs.existsSync(libraryPath);
    }
  );

  const commandCheck = spawnSync(command, ['--version']);

  const hasFiles = existingLibraries.at(0);
  const missingCommand = commandCheck.error;

  const isBothMissing = [
    !hasFiles,
    missingCommand
  ].every(Boolean);

  if (isBothMissing) {
    patchStatus = 'MISSING_FILES_AND_COMMAND';
  }

  const isFilesMissing = [
    !hasFiles,
    !missingCommand
  ].every(Boolean);

  if (isFilesMissing) {
    patchStatus = 'MISSING_FILES';
  }

  const isCommandMissing = [
    hasFiles,
    missingCommand
  ].every(Boolean);

  if (isCommandMissing) {
    patchStatus = 'MISSING_COMMAND';
  }

  if (patchStatus !== 'SUCCESS') {
    return patchStatus;
  }

  for (const fileName of existingLibraries) {
    const libraryPath = path.join(folderPath, fileName);
    const patchArgs = ['--clear-execstack', libraryPath];
    spawnSync(command, patchArgs);
  }

  return patchStatus;
}
