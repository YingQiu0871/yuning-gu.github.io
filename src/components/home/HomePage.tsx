import Link from 'next/link';
import Authors from '@/components/Authors';
import HeroPoster from '@/components/home/HeroPoster';
import type { Locale } from '@/lib/i18n/config';
import {
  education,
  highlights,
  homeContent,
  profile,
  publicationNotes,
  publications,
} from '@/lib/site-content';

export default function HomePage({ lang }: { lang: Locale }) {
  const content = homeContent[lang];
  const stats = [
    { value: publications.length, label: content.statLabels.publications },
    { value: publications.filter((p) => p.firstAuthor).length, label: content.statLabels.firstAuthor },
    { value: publications.filter((p) => p.corresponding).length, label: content.statLabels.corresponding },
  ];

  return (
    <>
      <section className="poster-hero" aria-labelledby="hero-title">
        <HeroPoster label={`${profile.name} portrait`} />
        <div className="poster-hero-copy section-shell">
          <h1 id="hero-title">
            {content.title}
            <span className="hot">{content.titleAccent}</span>
            {content.titleEnd}
          </h1>
          <div className="hero-actions">
            <Link className="button button-primary" href={`/${lang}/research`}>
              {content.primaryCta}
            </Link>
            <Link className="button button-secondary" href={`/${lang}/publications`}>
              {content.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="intro-strip section-shell">
        <p className="hero-intro">{content.intro}</p>
        <div className="intro-side">
          <aside className="poster" aria-label={content.statusLabel}>
            <div className="poster-band">
              <p className="card-label">{content.statusLabel}</p>
              <h2>{content.statusTitle}</h2>
              <p>{content.statusBody}</p>
              <span>{content.location}</span>
            </div>
          </aside>
          <p className="seeking-note">
            <strong>{content.seekingLabel}</strong>
            <span>{content.seekingText}</span>
            <Link className="text-link" href={`/${lang}/contact`}>
              {content.seekingCta}
            </Link>
          </p>
        </div>
      </section>

      <section className="stats-strip section-shell" aria-label="Profile at a glance">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="content-section section-shell">
        <div className="section-heading">
          <div>
            <h2>{content.focusHeading}</h2>
          </div>
          <p>{content.focusIntro}</p>
        </div>
        <div className="focus-grid">
          {content.focusAreas.map((area) => (
            <article className="focus-card" key={area.number}>
              <span>{area.number}</span>
              <p className="focus-tag">{area.tag}</p>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section section-shell split-section">
        <div>
          <div className="section-title-row">
            <h2>{content.latestHeading}</h2>
            <Link className="text-link" href={`/${lang}/experience`}>
              {content.latestLink}
            </Link>
          </div>
          <div className="timeline">
            {highlights[lang].map((item) => (
              <article key={`${item.date}-${item.title}`}>
                <time>{item.date}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="education-panel">
          <h2>{content.educationHeading}</h2>
          {education[lang].slice(0, 2).map((item) => (
            <article key={item.degree}>
              <time>{item.period}</time>
              <h3>{item.degree}</h3>
              <p>{item.school}</p>
            </article>
          ))}
          <Link className="text-link" href={`/${lang}/education`}>
            {lang === 'zh' ? '完整教育经历' : 'Full education history'}{' '}
           
          </Link>
        </div>
      </section>

      <section className="content-section section-shell">
        <div className="section-title-row">
          <h2>{content.publicationHeading}</h2>
          <Link className="text-link" href={`/${lang}/publications`}>
            {content.publicationLink}
          </Link>
        </div>
        <div className="publication-list">
          {publications.slice(0, 3).map((publication, index) => (
            <article className="publication-row" key={publication.doi}>
              <span className="publication-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{publication.title}</h3>
                <p>
                  <Authors list={publication.authors} />
                </p>
                <p className="publication-meta">
                  <span>{publication.venue}</span>
                  <span>{publication.date.slice(0, 4)}</span>
                  {publication.note ? (
                    <span>{lang === 'zh' ? publicationNotes[publication.note] : publication.note}</span>
                  ) : null}
                </p>
              </div>
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open DOI for ${publication.title}`}
              >
                DOI
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-band section-shell">
        <div>
          <h2>{content.contactHeading}</h2>
          <p>{content.contactBody}</p>
        </div>
        <a className="button button-primary" href={`mailto:${profile.email}`}>
          {content.emailCta}
        </a>
      </section>
    </>
  );
}
