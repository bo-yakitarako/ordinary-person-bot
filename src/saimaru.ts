import * as fs from 'fs/promises';
import path from 'path';
import { parseNoharaHiroshi } from './scraping';

// ルートディレクトリへのパスを設定
const rootDir = path.resolve(process.cwd());
const filePath = path.join(rootDir, 'saimaru.txt');

export const analyzeSaimaru = async () => {
  const noharaHiroshi = await parseNoharaHiroshi();
  const savedTitle = await readSavedTitle();
  if (savedTitle === null) {
    await saveTitle(noharaHiroshi.title);
  }
};

const readSavedTitle = async () => {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch {
    return null;
  }
};

const saveTitle = async (title: string) => {
  await fs.writeFile(filePath, title);
};
