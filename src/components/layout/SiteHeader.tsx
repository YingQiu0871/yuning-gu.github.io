'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { navigation, profile } from '@/lib/site-content';

export default function SiteHeader({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const switchLanguage = (nextLang: Locale) => {
    if (pathname === '/') return nextLang === 'en' ? '/' : '/zh';
    if (/^\/(en|zh)(\/|$)/.test(pathname)) {
      return pathname.replace(/^\/(en|zh)/, `/${nextLang}`);
    }
    return `/${nextLang}`;
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          href={`/${lang}`}
          aria-label={`${profile.name} home`}
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            YG
          </span>
          <span className="brand-copy">
            <strong>{profile.name}</strong>
            <small>{profile.chineseName}</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label={lang === 'zh' ? '主导航' : 'Primary navigation'}>
          {navigation[lang].map((item) => {
            if (item.external) {
              return (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                  {item.label} ↗
                </a>
              );
            }
            const active =
              pathname === item.href ||
              (item.href !== `/${lang}` && pathname.startsWith(`${item.href}/`));
            return (
              <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <Link
            className="language-link"
            href={switchLanguage(lang === 'en' ? 'zh' : 'en')}
            lang={lang === 'en' ? 'zh' : 'en'}
            hrefLang={lang === 'en' ? 'zh' : 'en'}
            onClick={() => setMenuOpen(false)}
          >
            {lang === 'en' ? '中文' : 'EN'}
          </Link>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={lang === 'zh' ? '切换明暗主题' : 'Toggle light and dark theme'}
          >
            <span className="theme-icon theme-icon-light" aria-hidden="true">
              ☀
            </span>
            <span className="theme-icon theme-icon-dark" aria-hidden="true">
              ☾
            </span>
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={lang === 'zh' ? '打开导航' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
        aria-label={lang === 'zh' ? '移动端导航' : 'Mobile navigation'}
      >
        {navigation[lang].map((item) =>
          item.external ? (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
              {item.label} ↗
            </a>
          ) : (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ),
        )}
      </nav>
    </header>
  );
}
