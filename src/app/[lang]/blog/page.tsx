import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatPostDate, getPosts, readingTimeLabel } from '@/lib/blog';
import { isValidLocale } from '@/lib/i18n/config';
import { createPageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createPageMetadata(lang, 'blog', {
    en: {
      title: 'Blog',
      description:
        'Notes on pharmaceutical sciences, research practice, and life between labs, written by Yuning Gu.',
    },
    zh: {
      title: '博客',
      description: '谷昱宁关于药物科学、科研方法与学习生活的随笔与笔记。',
    },
  });
}

export default async function BlogIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const posts = getPosts(lang);
  const zh = lang === 'zh';

  return (
    <div className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">{zh ? '随笔与笔记' : 'Writing & notes'}</p>
        <h1>{zh ? '博客' : 'Blog'}</h1>
        <p>
          {zh
            ? '记录药物科学、科研方法与学习生活中的思考。文章以 Markdown / MDX 撰写，支持 RSS 订阅。'
            : 'Notes on pharmaceutical sciences, research practice, and life between labs. Posts are written in Markdown / MDX, and an RSS feed is available.'}
        </p>
      </header>

      <div className="blog-toolbar">
        <span>
          {posts.length === 0
            ? zh
              ? '还没有文章'
              : 'No posts yet'
            : zh
              ? `共 ${posts.length} 篇文章`
              : `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
        </span>
        <a className="text-link" href="/feed.xml">
          RSS ↗
        </a>
      </div>

      <div className="stack-list">
        {posts.map((post) => (
          <article className="content-card blog-card" key={post.slug}>
            <Link className="blog-card-link" href={`/${lang}/blog/${post.slug}/`}>
              <h2>{post.title}</h2>
              <span className="meta">
                <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
                {' · '}
                {readingTimeLabel(post)}
              </span>
              <p>{post.description}</p>
            </Link>
            {post.tags.length > 0 && (
              <div className="tag-list">
                {post.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
