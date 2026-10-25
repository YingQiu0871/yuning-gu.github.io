import { Inter, Newsreader } from 'next/font/google';

export const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const serif = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const fontVariables = `${sans.variable} ${serif.variable}`;
