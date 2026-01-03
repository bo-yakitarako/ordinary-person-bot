import * as fs from 'fs';
import * as path from 'path';
import { parseSaimaru } from './scraping/saimaruScraping';
import { onceOnLogin } from './onceOnLogin';
import { EmbedBuilder } from 'discord.js';

// ルートディレクトリへのパスを設定
const rootDir = path.resolve(process.cwd());
const filePath = path.join(rootDir, 'saimaru.txt');

const analyzeSaimaru = async () => {
  const saimaru = await parseSaimaru();
  const savedTitle = readSavedTitle();
  if (savedTitle === saimaru.title) {
    return null;
  }
  saveTitle(saimaru.title);
  return { ...saimaru };
};

const readSavedTitle = () => {
  try {
    const content = fs.readFileSync(filePath, 'utf8').trim();
    return content || null;
  } catch {
    return null;
  }
};

const saveTitle = (title: string) => {
  fs.writeFileSync(filePath, title, { encoding: 'utf8' });
};

(async () => {
  const saimaru = await analyzeSaimaru();
  if (saimaru === null) {
    return;
  }
  onceOnLogin(async (channel) => {
    const { link, imageSrc, title } = saimaru;
    const embed = new EmbedBuilder().setTitle(title).setURL(link).setImage(imageSrc);
    await channel.send({ embeds: [embed] });
  });
})();
