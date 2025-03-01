import { Client, EmbedBuilder, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import { config } from 'dotenv';
import { parseNoharaHiroshi } from './scraping';

config();

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;

if (TOKEN === undefined) {
  throw new Error('TOKEN is not defined');
}
if (GUILD_ID === undefined) {
  throw new Error('GUILD_ID is not defined');
}
if (CHANNEL_ID === undefined) {
  throw new Error('CHANNEL_ID is not defined');
}

const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;

const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });

client.on(Events.ClientReady, async (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  const guild = client.guilds.cache.get(GUILD_ID);
  if (guild === undefined) {
    return;
  }
  const channel = guild.channels.cache.get(CHANNEL_ID) as TextChannel;
  if (channel === undefined) {
    return;
  }

  const { link, imageSrc, title } = await parseNoharaHiroshi();
  const embed = new EmbedBuilder().setTitle(title).setURL(link).setImage(imageSrc);
  await channel.send({ embeds: [embed] });
});

client.login(TOKEN);
