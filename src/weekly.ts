import { EmbedBuilder } from 'discord.js';
import { parseWeekly } from './scraping/weeklyScraping';
import { onceOnLogin } from './login';

onceOnLogin(async (channel) => {
  await new Promise((resolve) => setTimeout(resolve, 15000));
  const { link, imageSrc, title } = await parseWeekly();
  const embed = new EmbedBuilder().setTitle(title).setURL(link).setImage(imageSrc);
  await channel.send({ embeds: [embed] });
});
