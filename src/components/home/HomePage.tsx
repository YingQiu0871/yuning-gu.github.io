import Link from 'next/link';
import HeroPoster from '@/components/home/HeroPoster';
import type { Locale } from '@/lib/i18n/config';
import { homeContent, profile, publications } from '@/lib/site-content';

export default function HomePage({ lang }: { lang: Locale }) {
  const content = homeContent[lang];
  const zh = lang === 'zh';
  const total = publications.length;
  const first = publications.filter((p) => p.firstAuthor).length;
  const corresponding = publications.filter((p) => p.corresponding).length;

  // The home page is a poster, a paragraph and a contents list; the detail lives on the inner pages.
  const index = [
    {
      href: `/${lang}/research`,
      title: zh ? '研究' : 'Research',
      summary: zh
        ? '热熔挤出与 FDM 片剂打印；此前做过代谢健康数据和天然产物研究。'
        : 'Hot-melt extrusion and FDM-printed tablets; earlier work on metabolic health data and natural products.',
    },
    {
      href: `/${lang}/publications`,
      title: zh ? '论文' : 'Publications',
      summary: zh
        ? `${total} 篇同行评议论文，${first} 篇第一或共同第一作者，${corresponding} 篇通讯作者。`
        : `${total} peer-reviewed papers, ${first} as first or co-first author, ${corresponding} as corresponding author.`,
    },
    {
      href: `/${lang}/experience`,
      title: zh ? '经历' : 'Experience',
      summary: zh
        ? '塞格德大学、拜耳（中国）与滇虹药业、黑龙江中医药大学。'
        : 'University of Szeged, Bayer (China) and Dihon Pharmaceutical, Heilongjiang University of Chinese Medicine.',
    },
    {
      href: `/${lang}/education`,
      title: zh ? '教育' : 'Education',
      summary: zh
        ? '巴黎萨克雷大学 D2HP 硕士二年级；药物制剂学学士。'
        : 'M2 D2HP at Université Paris-Saclay; B.S. in Pharmaceutic Preparations.',
    },
    {
      href: `/${lang}/about`,
      title: zh ? '关于' : 'About',
      summary: zh
        ? '背景、方法与工具，还有实验室之外的几件事。'
        : 'Background, methods and tools, and a few things outside the lab.',
    },
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

      <nav className="home-index section-shell" aria-label={zh ? '栏目' : 'Sections'}>
        {index.map((item, position) => (
          <Link className="index-row" href={item.href} key={item.href}>
            <span className="index-number">{String(position + 1).padStart(2, '0')}</span>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
          </Link>
        ))}
      </nav>

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
