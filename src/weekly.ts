import { EmbedBuilder } from 'discord.js';
import { parseWeekly } from './scraping/weeklyScraping';
import { onceOnLogin } from './onceOnLogin';

onceOnLogin(async (channel) => {
  const { link, imageSrc, title } = await parseWeekly();
  const embed = new EmbedBuilder().setTitle(title).setURL(link).setImage(imageSrc);
  await channel.send({ embeds: [embed] });
});
