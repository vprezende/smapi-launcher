import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

export default async function revertGarbageCollector(folderPath) {

  const targetFiles = [
    'StardewModdingAPI.runtimeconfig.json',
    'Stardew Valley.runtimeconfig.json'
  ];

  for (const fileName of targetFiles) {
    
    const filePath = path.join(folderPath, fileName);

    const rawContent = await fs.readFile(filePath, 'utf-8');
    const parsedConfig = JSON.parse(rawContent);

    const runtimeOptions = parsedConfig?.runtimeOptions;
    const configProperties = runtimeOptions?.configProperties;

    if (configProperties) {

      const gcConcurrent = 'System.GC.Concurrent';
      const gcServer = 'System.GC.Server';
      const gcRetainVM = 'System.GC.RetainVM';

      delete configProperties[gcConcurrent];
      delete configProperties[gcServer];
      delete configProperties[gcRetainVM];

      const stringifyOptions = [null, 2];

      const jsonContent = JSON.stringify(parsedConfig, ...stringifyOptions);

      const formattedJson = `${jsonContent}${os.EOL}`;

      const fileData = [filePath, formattedJson];

      await fs.writeFile(...fileData, 'utf-8');
    }
  }
}
