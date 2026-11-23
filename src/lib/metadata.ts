import type { Metadata } from 'next';
import { isValidLocale } from '@/lib/i18n/config';
import { SITE_URL } from '@/lib/site-content';

export function createPageMetadata(
  lang: string,
  slug: string,
  copy: {
    en: { title: string; description: string };
    zh: { title: string; description: string };
  },
): Metadata {
  if (!isValidLocale(lang)) return {};
  const localized = copy[lang];
  const canonical = `${SITE_URL}/${lang}/${slug}/`;

  return {
    title: localized.title,
    description: localized.description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/${slug}/`,
        zh: `${SITE_URL}/zh/${slug}/`,
      },
    },
    openGraph: {
      url: canonical,
      title: `${localized.title} | Yuning Gu`,
      description: localized.description,
      images: [
        {
          url: `${SITE_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: 'Yuning Gu — Pharmaceutical Sciences',
        },
      ],
    },
  };
}
