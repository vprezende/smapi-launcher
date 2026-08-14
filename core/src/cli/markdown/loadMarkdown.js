import path from 'path';
import fs from 'fs/promises';

export default async function loadMarkdown(filename) {

  const rootDirectory = process.cwd();

  const coreDirectory = path.join(rootDirectory, 'core');
  const sourceDirectory = path.join(coreDirectory, 'src');
  
  const cliDirectory = path.join(sourceDirectory, 'cli');

  const docsDirectory = path.join(cliDirectory, 'docs');
  const filePath = path.join(docsDirectory, filename);

  const content = await fs.readFile(filePath, 'utf-8');

  return content;
}