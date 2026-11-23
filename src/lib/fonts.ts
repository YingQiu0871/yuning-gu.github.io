import { Jost, Karla, Noto_Sans_SC } from 'next/font/google';

// Werkstatt: Jost capitals for display, Karla for everything read.
export const display = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

export const body = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  display: 'swap',
});

// Chinese display weight to stand beside Jost 700. Google serves it in unicode-range
// slices, so a page only downloads the slices its headings actually use.
export const displaySC = Noto_Sans_SC({
  weight: ['900'],
  subsets: ['latin'],
  variable: '--font-hei-sc',
  display: 'swap',
  preload: false,
});

export const fontVariables = `${display.variable} ${body.variable} ${displaySC.variable}`;
