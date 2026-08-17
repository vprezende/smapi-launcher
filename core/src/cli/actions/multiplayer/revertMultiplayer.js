import path from 'node:path';
import util from 'node:util';
import childProcess from 'node:child_process';

const execFile = childProcess.execFile;
const execFileAsync = util.promisify(execFile);

export default async function revertMultiplayer(folderPath) {

  let missingCommand = false;

  const galaxyLibraries = [
    'libGalaxy64.so',
    'libGalaxyCSharpGlue.so'
  ];

  for (const libraryName of galaxyLibraries) {
    
    const libraryPath = path.join(folderPath, libraryName);

    const patchArgs = ['--set-execstack', libraryPath];

    try {
      await execFileAsync('patch', patchArgs);
    } catch (error) {
      if (error.code === 'ENOENT') {
        missingCommand = true;
      }
    }
  }

  return missingCommand;
}
