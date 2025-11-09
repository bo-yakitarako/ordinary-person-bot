import * as fs from 'fs';
import * as path from 'path';
import { parseNoharaHiroshi } from './scraping';

const rootDir = path.resolve(process.cwd());
const filePath = path.join(rootDir, 'niconico.txt');

export const analyzeNiconico = async () => {
  try {
    const { registeredAt, ...noharaHiroshi } = await parseNoharaHiroshi();
    const saved = readSavedText();
    if (saved === registeredAt) {
      return null;
    }
    fs.writeFileSync(filePath, registeredAt, { encoding: 'utf8' });
    return { ...noharaHiroshi };
  } catch {
    return null;
  }
};

const readSavedText = () => {
  try {
    const content = fs.readFileSync(filePath, 'utf8').trim();
    return content || null;
  } catch {
    return null;
  }
};
