import { config } from 'dotenv';
import { parse } from 'node-html-parser';

config();

const debug = process.env.DEBUG === 'true';

const ENTRY = debug ? 'http://localhost:8080' : 'https://manga-shinchan.com/hiroshi-hirumeshi';

export const parseNoharaHiroshi = async () => {
  const res = await fetch(ENTRY);
  const html = await res.text();
  const root = parse(html);
  console.log(root.querySelector('#episodes'));
};
