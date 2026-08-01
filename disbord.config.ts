import type { Config } from 'disbord';

export default {
  intents: ['Guilds', 'GuildMessages'],
  timer: {
    weekly: 'Sat 12:00',
    saimaru: 'Sat 12:00',
  },
  botErrorMessage: 'エラーが発生しました',
} satisfies Config;
