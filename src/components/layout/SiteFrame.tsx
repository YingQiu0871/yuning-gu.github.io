import type { Locale } from '@/lib/i18n/config';
import { profile } from '@/lib/site-content';
import SiteHeader from './SiteHeader';

export default function SiteFrame({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  return (
    <div className="site-frame">
      <SiteHeader lang={lang} />
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div>
          <strong>{profile.name}</strong>
          <span>
            {lang === 'zh'
              ? '药物科学 · 制剂技术 · 临床研究'
              : 'Pharmaceutical sciences · Drug delivery · Clinical research'}
          </span>
        </div>
        <nav
          className="footer-profiles"
          aria-label={lang === 'zh' ? '学术与开发主页' : 'Academic and development profiles'}
        >
          <a href={profile.googleScholar} target="_blank" rel="noreferrer">
            Google Scholar ↗
          </a>
          <a href={profile.orcid} target="_blank" rel="noreferrer">
            ORCID ↗
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </nav>
        <div className="footer-meta">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <small>© {new Date().getFullYear()} Yuning Gu</small>
        </div>
      </footer>
    </div>
  );
}
