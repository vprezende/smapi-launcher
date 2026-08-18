import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

export default async function applyGarbageCollector(folderPath) {

  const targetFiles = [
    'StardewModdingAPI.runtimeconfig.json',
    'Stardew Valley.runtimeconfig.json'
  ];

  const existingFiles = targetFiles.filter(
    (fileName) => {
      const filePath = path.join(folderPath, fileName);
      return fs.existsSync(filePath);
    }
  );

  for (const fileName of existingFiles) {
    
    const filePath = path.join(folderPath, fileName);

    const rawContent = await fsp.readFile(filePath, 'utf-8');
    const parsedConfig = JSON.parse(rawContent);

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

    await fsp.writeFile(...fileData, 'utf-8');
  }

  if (existingFiles.at(0)) {
    return true;
  }

  return false;
}