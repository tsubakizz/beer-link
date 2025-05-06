import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequestGet: PagesFunction = async (context) => {
  return new Response('pong from /ping', { status: 200 });
};
