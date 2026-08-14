import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-content';

export const dynamic = 'force-static';

const routes = ['', 'about', 'education', 'experience', 'projects', 'publications', 'research', 'skills', 'contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-08-14');
  const localized = routes.flatMap((route) =>
    (['en', 'zh'] as const).map((lang) => {
      const suffix = route ? `/${route}` : '';
      return {
        url: `${SITE_URL}/${lang}${suffix}/`,
        lastModified,
        changeFrequency: route === 'publications' ? ('monthly' as const) : ('yearly' as const),
        priority: route === '' ? 1 : route === 'publications' || route === 'research' ? 0.9 : 0.7,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${suffix}/`,
            zh: `${SITE_URL}/zh${suffix}/`,
          },
        },
      };
    }),
  );

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...localized,
  ];
}
