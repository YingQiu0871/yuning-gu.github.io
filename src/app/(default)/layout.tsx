import type { Metadata, Viewport } from 'next';
import '../globals.css';
import SiteFrame from '@/components/layout/SiteFrame';
import ThemeScript from '@/components/layout/ThemeScript';
import { SITE_URL } from '@/lib/site-content';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Yuning Gu | Pharmaceutical Sciences',
    template: '%s | Yuning Gu',
  },
  description:
    'Academic portfolio of Yuning Gu, an M2 D2HP student working across pharmaceutical technology, drug delivery, natural products, and clinical research.',
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      en: `${SITE_URL}/en/`,
      zh: `${SITE_URL}/zh/`,
    },
  },
  openGraph: {
    type: 'profile',
    url: `${SITE_URL}/`,
    title: 'Yuning Gu | Pharmaceutical Sciences',
    description:
      'Pharmaceutical technology, drug delivery, natural products, and clinical research.',
    siteName: 'Yuning Gu',
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1733,
        height: 909,
        alt: 'Yuning Gu — Pharmaceutical Sciences',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yuning Gu | Pharmaceutical Sciences',
    description:
      'Pharmaceutical technology, drug delivery, natural products, and clinical research.',
    images: [`${SITE_URL}/og.png`],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f7fc' },
    { media: '(prefers-color-scheme: dark)', color: '#071426' },
  ],
};

export default function DefaultRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteFrame lang="en">{children}</SiteFrame>
      </body>
    </html>
  );
}
