import fs from 'node:fs/promises';
import process from 'node:process';

export default async function printVersion() {

  const stdout = process.stdout;
  
  const meta = import.meta;

  const currentUrl = meta.url;
  const cliUrl = new URL('..', currentUrl);

  const srcUrl = new URL('..', cliUrl);
  const coreUrl = new URL('..', srcUrl);
  
  const rootUrl = new URL('..', coreUrl);

  const packageUrl = new URL('package.json', rootUrl);
  const packageContent = await fs.readFile(packageUrl, 'utf8');

  const packageData = JSON.parse(packageContent);

  const versionText = `${packageData.name} v${packageData.version}`;

  stdout.write(versionText);
  stdout.write('\n');
}
