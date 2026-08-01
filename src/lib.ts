import type { Client, TextChannel } from 'discord.js';

export const getChannel = (client: Client<true>) => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (guild === undefined) {
    throw new Error('なんだそのサーバーは');
  }
  const channel = guild.channels.cache.get(process.env.CHANNEL_ID) as TextChannel;
  if (channel === undefined) {
    throw new Error('川口みてえなチャンネル');
  }
  return channel;
};
