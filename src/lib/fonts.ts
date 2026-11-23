import { Anton, Noto_Sans_SC, Public_Sans } from 'next/font/google';

// Manifesto: Anton capitals at poster size over a quiet Public Sans body.
export const display = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

export const body = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
});

// Chinese display weight to stand beside Anton. Google serves it in unicode-range
// slices, so a page only downloads the slices its headings actually use.
export const displaySC = Noto_Sans_SC({
  weight: ['900'],
  subsets: ['latin'],
  variable: '--font-hei-sc',
  display: 'swap',
  preload: false,
});

export const fontVariables = `${display.variable} ${body.variable} ${displaySC.variable}`;
