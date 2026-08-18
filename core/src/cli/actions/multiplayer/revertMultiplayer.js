import fs from 'node:fs';
import path from 'node:path';
import childProcess from 'node:child_process';

const spawnSync = childProcess.spawnSync;

export default async function revertMultiplayer(folderPath) {

  const galaxyLibraries = [
    'libGalaxy64.so',
    'libGalaxyCSharpGlue.so'
  ];

  let patchStatus = 'SUCCESS';

  const existingLibraries = galaxyLibraries.filter(
    (fileName) => {
      const libraryPath = path.join(folderPath, fileName);
      return fs.existsSync(libraryPath);
    }
  );

  if (!existingLibraries.at(0)) {
    patchStatus = 'MISSING_FILES';
  }

  for (const fileName of existingLibraries) {
    const libraryPath = path.join(folderPath, fileName);
    const patchArgs = ['--set-execstack', libraryPath];
    
    const result = spawnSync('patch', patchArgs);
    const spawnError = result.error;
    const errorCode = spawnError?.code;

    if (errorCode === 'ENOENT') {
      patchStatus = 'MISSING_COMMAND';
      break;
    }
  }

  return patchStatus;
}