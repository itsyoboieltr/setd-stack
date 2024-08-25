import { Elysia } from 'elysia';
import { todoRoute } from '@/server/todo';

export const app = new Elysia({ prefix: '/api' }).use(todoRoute).compile();

export type App = typeof app;
