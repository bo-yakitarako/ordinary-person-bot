import fs from 'node:fs';
import path from 'node:path';
import { EmbedBuilder, type Client } from 'discord.js';
import { getChannel } from '@/lib';
import { parseSaimaru } from '@/scraping/saimaruScraping';

export default async function (client: Client<true>) {
  if (process.env.DEBUG !== 'true') {
    await new Promise((resolve) => setTimeout(resolve, 15000));
  }
  const saimaru = await analyzeSaimaru();
  if (saimaru === null) {
    console.log('更新なさぽよ');
    return;
  }
  const { link, imageSrc, title } = saimaru;
  const embed = new EmbedBuilder().setTitle(title).setURL(link).setImage(imageSrc);
  await getChannel(client).send({ embeds: [embed] });
}

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
