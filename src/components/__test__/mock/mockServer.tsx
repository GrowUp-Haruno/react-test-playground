import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const joke = 'Chuck Norris counted to infinity. Twice.';

const handlers = [
  rest.get('https://api.chucknorris.io/jokes/random', (req, res, ctx) => {
    return res(ctx.json({ value: joke }));
  }),

  rest.get('https://jsonplaceholder.typicode.com/posts/1', (req, res, ctx) => {
    return res(ctx.json({ title: 'How to Become a Bad Developer' }));
  }),

  rest.get('https://jsonplaceholder.typicode.com/posts/1/comments', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'Rafael' },
        { id: 2, name: 'Andressa' },
      ])
    );
  }),
];

export const mockServer = setupServer(...handlers);

export const errorHandlers = {

  jokesRandom: rest.get('https://api.chucknorris.io/jokes/random', (req, res, ctx) => {
    return res(ctx.status(500));
  }),

  posts: rest.get('https://jsonplaceholder.typicode.com/posts/1', (req, res, ctx) => {
    return res(ctx.status(500));
  }),

  comments:rest.get('https://jsonplaceholder.typicode.com/posts/1/comments', (req, res, ctx) => {
    return res(ctx.status(500));
  }),
}
