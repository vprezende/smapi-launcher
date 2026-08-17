import path from 'node:path';
import util from 'node:util';
import process from 'node:process';
import childProcess from 'node:child_process';

const execFile = childProcess.execFile;
const execFileAsync = util.promisify(execFile);

export default async function applyMultiplayer(folderPath) {

  if (process.platform !== 'linux') {
    return false;
  }

  let missingCommand = false;

  const galaxyLibraries = [
    'libGalaxy64.so',
    'libGalaxyCSharpGlue.so'
  ];

  for (const libraryName of galaxyLibraries) {
    
    const libraryPath = path.join(folderPath, libraryName);

    const patchArgs = ['--clear-execstack', libraryPath];

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
