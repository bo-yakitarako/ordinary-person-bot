import { config } from 'dotenv';
import { parse } from 'node-html-parser';

config();

const debug = process.env.DEBUG === 'true';

const ENTRY = debug
  ? 'http://localhost:8080'
  : 'https://manga-shinchan.com/hiroshi-hirumeshi-saimaru';

export const parseNoharaHiroshi = async () => {
  const res = await fetch(ENTRY);
  const html = await res.text();
  const root = parse(html);
  const latestEpisode = root.querySelector('#episodes .row:first-child');
  if (latestEpisode === null) {
    throw new Error('Latest episode not found');
  }
  const link = latestEpisode.querySelector('a')?.getAttribute('href');
  if (!link) {
    throw new Error('Latest episode link not found');
  }
  const imageSrc = latestEpisode
    .querySelector('.item__list-img figure a:last-child img')
    ?.getAttribute('src');
  if (!imageSrc) {
    throw new Error('Latest episode image source not found');
  }
  const title = latestEpisode.querySelector('.item__list-text h3 a')?.innerText;
  if (!title) {
    throw new Error('Latest episode title not found');
  }
  return {
    link,
    imageSrc,
    title: title.trim(),
  };
};
