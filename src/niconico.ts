import * as fs from 'fs';
import * as path from 'path';
import { parseNiconico } from './scraping/niconicoScraping';
import { EmbedBuilder } from 'discord.js';
import { onceOnLogin } from './login';

const rootDir = path.resolve(process.cwd());
const filePath = path.join(rootDir, 'niconico.txt');

const analyzeNiconico = async () => {
  try {
    const { registeredAt, ...noharaHiroshi } = await parseNiconico();
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

(async () => {
  const niconico = await analyzeNiconico();
  if (niconico === null) {
    return;
  }
  onceOnLogin(async (channel) => {
    const { title, description, thumbnail, link } = niconico;
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setImage(thumbnail)
      .setURL(link);
    await channel.send({ embeds: [embed] });
  });
})();
