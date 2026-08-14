import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { formatPostDate, getAllSlugs, getPost, readingTimeLabel } from '@/lib/blog';
import { isValidLocale, locales, type Locale } from '@/lib/i18n/config';
import { createPageMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    for (const slug of slugs) params.push({ lang, slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getPost(lang, slug);
  if (!post) return {};
  return createPageMetadata(lang, `blog/${slug}`, {
    en: { title: post.title, description: post.description },
    zh: { title: post.title, description: post.description },
  });
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();
  const post = getPost(lang, slug);

  if (!post) {
    const other: Locale = lang === 'zh' ? 'en' : 'zh';
    const counterpart = getPost(other, slug);
    if (!counterpart) notFound();

    return (
      <div className="page-shell">
        <div className="content-card blog-fallback">
          <p className="eyebrow">{lang === 'zh' ? '博客' : 'Blog'}</p>
          <h1>{counterpart.title}</h1>
          <p>
            {lang === 'zh'
              ? '这篇文章暂时只有英文版。你可以阅读原文，或回到博客列表。'
              : 'This post is not available in English yet. You can read the original, or head back to the blog.'}
          </p>
          <div className="blog-fallback-actions">
            <Link className="button button-secondary" href={`/${other}/blog/${slug}/`}>
              {lang === 'zh' ? '阅读英文版' : 'Read the original'}
            </Link>
            <Link className="text-link" href={`/${lang}/blog/`}>
              {lang === 'zh' ? '返回博客' : 'Back to blog'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const zh = lang === 'zh';

  return (
    <div className="page-shell">
      <article className="blog-post">
        <header className="blog-post-header">
          <p className="eyebrow">{zh ? '博客' : 'Blog'}</p>
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
            <span>{readingTimeLabel(post)}</span>
            {post.updated ? (
              <span>
                {zh
                  ? `更新于 ${formatPostDate(post.updated, lang)}`
                  : `Updated ${formatPostDate(post.updated, lang)}`}
              </span>
            ) : null}
          </div>
          {post.tags.length > 0 && (
            <div className="tag-list">
              {post.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="blog-article">
          <MDXRemote source={post.source} options={mdxOptions} />
        </div>

        <footer className="blog-post-footer">
          <Link className="text-link" href={`/${lang}/blog/`}>
            ← {zh ? '返回博客' : 'Back to blog'}
          </Link>
        </footer>
      </article>
    </div>
  );
}
