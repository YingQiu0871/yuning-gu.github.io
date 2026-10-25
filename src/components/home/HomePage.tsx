import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import {
  education,
  highlights,
  homeContent,
  profile,
  publications,
} from '@/lib/site-content';

export default function HomePage({ lang }: { lang: Locale }) {
  const content = homeContent[lang];

  return (
    <>
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id="hero-title">{content.title}</h1>
          <p className="hero-intro">{content.intro}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href={`/${lang}/research`}>
              {content.primaryCta}
            </Link>
            <Link className="button button-secondary" href={`/${lang}/publications`}>
              {content.secondaryCta}
            </Link>
          </div>
        </div>

        <aside className="profile-card" aria-label={content.statusLabel}>
          <div className="portrait-wrap">
            <Image
              src="/images/avatar.webp"
              alt={`${profile.name} portrait`}
              width="416"
              height="416"
              priority
              sizes="(max-width: 720px) 72vw, 416px"
            />
          </div>
          <div className="profile-card-copy">
            <p className="card-label">{content.statusLabel}</p>
            <h2>{content.statusTitle}</h2>
            <p>{content.statusBody}</p>
            <span>{content.location}</span>
          </div>
        </aside>
      </section>

      <section className="stats-strip section-shell" aria-label="Profile at a glance">
        {content.stats.map((stat) => (
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
              {content.latestLink} <span aria-hidden="true">→</span>
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
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="content-section section-shell">
        <div className="section-title-row">
          <h2>{content.publicationHeading}</h2>
          <Link className="text-link" href={`/${lang}/publications`}>
            {content.publicationLink} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="publication-list">
          {publications.slice(0, 3).map((publication, index) => (
            <article className="publication-row" key={publication.doi}>
              <span className="publication-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="publication-meta">
                  {publication.venue} · {publication.date}
                </p>
                <h3>{publication.title}</h3>
                <p>{publication.authors}</p>
              </div>
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open DOI for ${publication.title}`}
              >
                DOI ↗
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
