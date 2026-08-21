import fs from 'node:fs/promises';

export default async function loadMarkdown(filename) {

  const meta = import.meta;

  const fileUrl = new URL(`../docs/${filename}`, meta.url);
  const content = await fs.readFile(fileUrl, 'utf-8');

  return content;
}