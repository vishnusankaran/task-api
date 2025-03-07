import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { buildSchema } from 'drizzle-graphql';
import { createYoga } from 'graphql-yoga';

import { db } from './db/index.ts';

const { schema } = buildSchema(db);

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
});

const app = new Hono();

app.use(
  '*',
  cors({
    origin: (process.env.ALLOWED_ORIGINS || '')?.split(','),
    allowMethods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    maxAge: 6000,
  })
);

app.use('/graphql', async (c) => {
  const ctx = Object.prototype.hasOwnProperty.call(c, 'executionCtx')
    ? c.executionCtx
    : {};
  const request = new Request(c.req.url, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body: c.req.raw.body,
  });
  return yoga.handleRequest(request, {
    env: c.env,
    ctx,
  });
});

const port = 4000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
