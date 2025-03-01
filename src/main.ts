import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { parseNoharaHiroshi } from './scraping';

config();

const TOKEN = process.env.TOKEN;

if (TOKEN === undefined) {
  throw new Error('TOKEN is not defined');
}

const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;

const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });

client.on(Events.ClientReady, (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content === '野原') {
    await message.reply('ひろし');
  }
});

client.login(TOKEN);

parseNoharaHiroshi();
