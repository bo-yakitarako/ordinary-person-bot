import { config } from 'dotenv';
import { parse } from 'node-html-parser';

config();

const debug = process.env.DEBUG === 'true';

const ENTRY = debug
  ? 'http://localhost:8080'
  : 'https://www.nicovideo.jp/series/532563?rf=nvpc&rp=watch&ra=series';

// eslint-disable-next-line complexity
export const parseNoharaHiroshi = async () => {
  const res = await fetch(ENTRY);
  const html = await res.text();
  const root = parse(html);
  const episodes = root.querySelectorAll('.NC-MediaObject-main');
  if (episodes.length === 0) {
    throw new Error('無くね？');
  }
  const target = episodes[episodes.length - 1];
  const title = target.querySelector('h2')?.innerText?.trim();
  const thumbnail = target
    .querySelector('.NC-Thumbnail-image')
    ?.getAttribute('data-background-image');
  const description = target.querySelector('.NC-VideoMediaObject-description')?.innerText?.trim();
  const registeredAt = target.querySelector('.NC-VideoRegisteredAtText-text')?.innerText?.trim();
  const link = target.querySelector('a')?.getAttribute('href');
  if (!title || !thumbnail || !description || !registeredAt || !link) {
    throw new Error('なんだこのエピソードは');
  }
  return { title, thumbnail, description, registeredAt, link };
};
