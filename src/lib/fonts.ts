import { Inter, Newsreader, Noto_Serif_SC } from 'next/font/google';

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

// Chinese display serif. Google serves it in unicode-range slices, so a page only
// downloads the slices for the characters its headings actually use.
export const serifSC = Noto_Serif_SC({
  weight: ['600'],
  subsets: ['latin'],
  variable: '--font-serif-sc',
  display: 'swap',
  preload: false,
});

export const fontVariables = `${sans.variable} ${serif.variable} ${serifSC.variable}`;
