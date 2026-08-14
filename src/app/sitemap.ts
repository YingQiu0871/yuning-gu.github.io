import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
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

  const blogIndexEntries = (['en', 'zh'] as const).map((lang) => ({
    url: `${SITE_URL}/${lang}/blog/`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogPosts = getAllPosts();
  const blogEntries = blogPosts.map((post) => {
    const counterpart = blogPosts.find((p) => p.slug === post.slug && p.lang !== post.lang);
    return {
      url: `${SITE_URL}/${post.lang}/blog/${post.slug}/`,
      lastModified: post.updated ?? post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      ...(counterpart
        ? {
            alternates: {
              languages: {
                en: `${SITE_URL}/en/blog/${post.slug}/`,
                zh: `${SITE_URL}/zh/blog/${post.slug}/`,
              },
            },
          }
        : {}),
    };
  });

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...localized,
    ...blogIndexEntries,
    ...blogEntries,
  ];
}
