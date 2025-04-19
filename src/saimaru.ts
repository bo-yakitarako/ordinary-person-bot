import * as fs from 'fs';
import * as path from 'path';
import { parseNoharaHiroshi } from './scraping';

// ルートディレクトリへのパスを設定
const rootDir = path.resolve(process.cwd());
const filePath = path.join(rootDir, 'saimaru.txt');

export const analyzeSaimaru = async () => {
  const noharaHiroshi = await parseNoharaHiroshi();
  const savedTitle = readSavedTitle();
  if (savedTitle === noharaHiroshi.title) {
    return null;
  }
  saveTitle(noharaHiroshi.title);
  return { ...noharaHiroshi };
};

const readSavedTitle = () => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content || null;
  } catch {
    return null;
  }
};

const saveTitle = (title: string) => {
  fs.writeFileSync(filePath, title, { encoding: 'utf8' });
};
