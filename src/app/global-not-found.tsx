import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import ThemeScript from '@/components/layout/ThemeScript';
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
      <body className="not-found-body">
        <main className="not-found-page">
          <header className="not-found-header">
            <Link className="brand" href="/" aria-label="Yuning Gu home">
              <span className="brand-mark" aria-hidden="true">
                YG
              </span>
              <span className="brand-copy">
                <strong>Yuning Gu</strong>
                <small>谷昱宁</small>
              </span>
            </Link>
            <span>Pharmaceutical Sciences</span>
          </header>

          <section className="not-found-content" aria-labelledby="not-found-title">
            <div className="not-found-copy">
              <p className="eyebrow">404 · Page not found</p>
              <p className="not-found-code" aria-hidden="true">
                404
              </p>
              <h1 id="not-found-title">
                This page could not be found.
                <span>页面未找到。</span>
              </h1>
              <p>
                The address may have changed, or the page may no longer exist.
                <span>该页面可能已移动，或输入的地址有误。</span>
              </p>
              <div className="not-found-actions">
                <Link className="button button-primary" href="/">
                  Back to home
                </Link>
                <Link className="button button-secondary" href="/zh/">
                  返回中文首页
                </Link>
              </div>
              <nav className="not-found-links" aria-label="Suggested pages">
                <Link href="/en/research/">Research</Link>
                <Link href="/en/publications/">Publications</Link>
                <Link href="/en/contact/">Contact</Link>
              </nav>
            </div>

            <div className="not-found-visual" aria-hidden="true">
              <div className="not-found-orbit orbit-one">
                <span />
              </div>
              <div className="not-found-orbit orbit-two">
                <span />
              </div>
              <div className="not-found-tablet tablet-one" />
              <div className="not-found-tablet tablet-two" />
              <div className="not-found-particle particle-one" />
              <div className="not-found-particle particle-two" />
              <div className="not-found-particle particle-three" />
            </div>
          </section>

          <footer className="not-found-footer">
            <span>yuning-gu.github.io</span>
            <span>Université Paris-Saclay · 2026</span>
          </footer>
        </main>
      </body>
    </html>
  );
}
