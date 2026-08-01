import { EmbedBuilder, type Client } from 'discord.js';
import { getChannel } from '@/lib';
import { parseWeekly } from '@/scraping/weeklyScraping';

export default async function (client: Client<true>) {
  if (process.env.DEBUG !== 'true') {
    await new Promise((resolve) => setTimeout(resolve, 15000));
  }
  await getChannel(client).send({ embeds: [await getWeeklyEmbed()] });
}

export const getWeeklyEmbed = async () => {
  const { link, imageSrc, title } = await parseWeekly();
  return new EmbedBuilder().setTitle(title).setURL(link).setImage(imageSrc);
};
