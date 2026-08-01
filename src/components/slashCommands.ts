import { EmbedBuilder } from '@discordjs/builders';
import type { SlashCommandRegistration } from 'disbord';
import { getWeeklyEmbed } from '@/once/weekly';
import { parseSaimaru } from '@/scraping/saimaruScraping';

export default {
  weekly: {
    description: 'いつもありがとう',
    async execute(interaction) {
      await interaction.reply({ embeds: [await getWeeklyEmbed()] });
    },
  },
  saimaru: {
    description: '忘れないで。いつまでも',
    async execute(interaction) {
      const saimaru = await parseSaimaru();
      const { link, imageSrc, title } = saimaru;
      const embed = new EmbedBuilder().setTitle(title).setURL(link).setImage(imageSrc);
      await interaction.reply({ embeds: [embed] });
    },
  },
} satisfies SlashCommandRegistration;
