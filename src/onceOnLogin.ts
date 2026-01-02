import { Client, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import { config } from 'dotenv';

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

const { Guilds, GuildMessages } = GatewayIntentBits;

export const onceOnLogin = (callback: (channel: TextChannel) => Promise<void>) => {
  const client = new Client({ intents: [Guilds, GuildMessages] });
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
    await callback(channel);
    await client.destroy();
  });
  client.login(TOKEN);
};
