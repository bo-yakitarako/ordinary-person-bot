import { EmbedBuilder } from 'discord.js';
import { parseNoharaHiroshi } from './scraping';
import { onceOnLogin } from './onceOnLogin';

onceOnLogin(async (channel) => {
  const { link, imageSrc, title } = await parseNoharaHiroshi();
  const embed = new EmbedBuilder().setTitle(title).setURL(link).setImage(imageSrc);
  await channel.send({ embeds: [embed] });
});
