import { Events } from 'discord.js';
import { login } from './login';

const client = login();

client.on(Events.ClientReady, () => {
  console.log('ああ。確かにそこに一般人は存在しています');
});
