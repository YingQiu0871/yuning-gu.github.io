import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import ThemeScript from '@/components/layout/ThemeScript';
import LostArt from '@/components/poster/LostArt';
import { fontVariables } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Page not found | Yuning Gu',
  description: 'The requested page could not be found.',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="lost-body">
        <main className="lost-page">
          <LostArt />

          <header className="lost-header">
            <Link className="brand" href="/" aria-label="Yuning Gu home">
              <span className="brand-mark" aria-hidden="true">
                YG
              </span>
              <span className="brand-copy">
                <strong>Yuning Gu</strong>
                <small>谷昱宁</small>
              </span>
            </Link>
          </header>

          <section className="lost-copy" aria-labelledby="lost-title">
            <p className="lost-code" aria-hidden="true">
              404
            </p>
            <h1 id="lost-title">
              This page is <span className="hot">off course</span>
              <span className="lost-zh" lang="zh">
                页面偏离了航线
              </span>
            </h1>
            <p className="lost-note">
              The address may have changed, or the page may no longer exist.
              <span lang="zh">这个地址可能已经改了，或者页面已经不在了。</span>
            </p>
            <div className="lost-actions">
              <Link className="button button-primary" href="/">
                Back to home
              </Link>
              <Link className="button button-secondary" href="/zh/">
                返回中文首页
              </Link>
            </div>
            <nav className="lost-links" aria-label="Suggested pages">
              <Link href="/en/research/">Research</Link>
              <Link href="/en/publications/">Publications</Link>
              <Link href="/en/contact/">Contact</Link>
            </nav>
          </section>
        </main>

        <footer className="lost-footer">
          <span>yingqiu.me</span>
          <span>Université Paris-Saclay, 2026</span>
        </footer>
      </body>
    </html>
  );
}
