import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { App } from '@/server';
import { treaty } from '@elysiajs/eden';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const { api } = treaty<App>(
  typeof window === 'undefined'
    ? 'http://localhost:3000'
    : window.location.origin
);
