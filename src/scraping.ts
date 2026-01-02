import { config } from 'dotenv';
import { parse } from 'node-html-parser';

config();

const debug = process.env.DEBUG === 'true';

const ENTRY = debug ? 'http://localhost:3000' : 'https://manga-shinchan.com/hiroshi-hirumeshi';

export const parseNoharaHiroshi = async () => {
  const res = await fetch(ENTRY);
  const html = await res.text();
  const root = parse(html);
  for (const episode of root.querySelectorAll('#episodes .row')) {
    if (episode === null) {
      continue;
    }
    if (episode.querySelector('.item__list-text p')?.innerText.includes('更新予定')) {
      continue;
    }
    const link = episode.querySelector('a')?.getAttribute('href');
    if (!link) {
      throw new Error('エピソードリンクが見つからんぽい');
    }
    const imageSrc = episode
      .querySelector('.item__list-img figure a:last-child img')
      ?.getAttribute('src');
    if (!imageSrc) {
      throw new Error('エピソードはあるけどサムネ画像が見つからないらしい');
    }
    const title = episode.querySelector('.item__list-text h3 a')?.innerText;
    if (!title) {
      throw new Error('エピソードはあるけどタイトルが見つからないらしい');
    }
    return {
      link,
      imageSrc,
      title: title.trim(),
    };
  }
  throw new Error('根本的になにかが違う');
};
