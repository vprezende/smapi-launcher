import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

export default async function applyGarbageCollector(folderPath) {

  const targetFiles = [
    'StardewModdingAPI.runtimeconfig.json',
    'Stardew Valley.runtimeconfig.json'
  ];

  for (const fileName of targetFiles) {
    
    const filePath = path.join(folderPath, fileName);

    let parsedConfig;

    try {
      await fs.access(filePath);
      const rawContent = await fs.readFile(filePath, 'utf-8');
      parsedConfig = JSON.parse(rawContent);
    } catch {
      
      parsedConfig = new Object();

      const runtimeOptions = new Object();
      runtimeOptions.tfm = 'net6.0';

      const framework = new Object();
      framework.name = 'Microsoft.NETCore.App';
      framework.version = '6.0.0';
      framework.rollForward = 'latestMinor';

      runtimeOptions.includedFrameworks = new Array();
      runtimeOptions.includedFrameworks.push(framework);

      const tieredCompilation = 'System.Runtime.TieredCompilation';

      const configMap = new Map();

      const setMethod = configMap.set;
      const setProperty = setMethod.bind(configMap);

      setProperty(tieredCompilation, false);

      runtimeOptions.configProperties = Object.fromEntries(configMap);

      parsedConfig.runtimeOptions = runtimeOptions;
    }

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

    await fs.writeFile(...fileData, 'utf-8');
  }
}
