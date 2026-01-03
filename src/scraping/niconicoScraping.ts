import { config } from 'dotenv';
import { parse } from 'node-html-parser';

config();

const debug = process.env.DEBUG === 'true';

const ENTRY = debug
  ? 'http://localhost:3000/niconico'
  : 'https://www.nicovideo.jp/series/532563?rf=nvpc&rp=watch&ra=series';

export const parseNiconico = async () => {
  const res = await fetch(ENTRY);
  const html = await res.text();
  const root = parse(html);
  const episodes = root.querySelectorAll('.NC-MediaObject-main');
  if (episodes.length === 0) {
    throw new Error('無くね？');
  }
  const target = episodes[episodes.length - 1];
  const link = target.querySelector('a')?.getAttribute('href');
  if (!link) {
    throw new Error('なんだこのエピソードは');
  }
  const detailLink = debug ? 'http://localhost:3000/nicovideo' : link;
  const data = await parseDetail(detailLink);
  if (data === null) {
    throw new Error('動画ページこわれてね？');
  }
  return { ...data, link };
};

type ServerResponse = {
  data: {
    response: {
      video: {
        id: string;
        title: string;
        description: string;
        thumbnail: { url: string; ogp: string };
        registeredAt: string;
      };
    };
  };
};

const parseDetail = async (link: string) => {
  const fetched = await fetch(link);
  const html = await fetched.text();
  const root = parse(html);
  const meta = root.querySelector('meta[name="server-response"]');
  const res = JSON.parse(meta?.getAttribute('content') ?? 'null') as ServerResponse | null;
  if (res === null) {
    return null;
  }
  const { video } = res.data.response;
  const { title, registeredAt } = video;
  const description = video.description.replace(/<br>/g, '\n').split('<u>')[0].trim();
  const thumbnail = video.thumbnail.ogp;
  return { title, description, thumbnail, registeredAt };
};
