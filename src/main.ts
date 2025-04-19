import { Client, EmbedBuilder, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import { config } from 'dotenv';
import { analyzeSaimaru } from './saimaru';

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

(async () => {
  const noharaHiroshi = await analyzeSaimaru();
  if (noharaHiroshi === null) {
    return;
  }

  const { Guilds, GuildMessages } = GatewayIntentBits;

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

    const { link, imageSrc, title } = noharaHiroshi;
    const embed = new EmbedBuilder().setTitle(title).setURL(link).setImage(imageSrc);
    await channel.send({ embeds: [embed] });
    await client.destroy();
  });

  client.login(TOKEN);
})();
