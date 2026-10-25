import type { Metadata, Viewport } from 'next';
import '../globals.css';
import SiteFrame from '@/components/layout/SiteFrame';
import PersonStructuredData from '@/components/seo/PersonStructuredData';
import ThemeScript from '@/components/layout/ThemeScript';
import { isValidLocale, locales } from '@/lib/i18n/config';
import { SITE_URL } from '@/lib/site-content';
import { fontVariables } from '@/lib/fonts';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const zh = lang === 'zh';
  const url = `${SITE_URL}/${lang}/`;
  const title = zh ? '谷昱宁 | 药物科学' : 'Yuning Gu | Pharmaceutical Sciences';
  const description = zh
    ? '谷昱宁的学术主页，研究方向涵盖药物制剂技术、药物递送、天然产物与临床研究。'
    : 'Academic portfolio of Yuning Gu, working across pharmaceutical technology, drug delivery, natural products, and clinical research.';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: zh ? '%s | 谷昱宁' : '%s | Yuning Gu',
    },
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/`,
        zh: `${SITE_URL}/zh/`,
      },
    },
    openGraph: {
      type: 'profile',
      url,
      title,
      description,
      siteName: 'Yuning Gu',
      locale: zh ? 'zh_CN' : 'en_GB',
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
      title,
      description,
      images: [`${SITE_URL}/og.png`],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
    { media: '(prefers-color-scheme: dark)', color: '#121413' },
  ],
};

export default async function LangRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const skipLabel = lang === 'zh' ? '跳转到主要内容' : 'Skip to content';

  return (
    <html lang={lang} className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <PersonStructuredData />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          {skipLabel}
        </a>
        <SiteFrame lang={lang}>{children}</SiteFrame>
      </body>
    </html>
  );
}
