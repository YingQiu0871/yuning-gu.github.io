import { notFound } from 'next/navigation';
import PageArt from '@/components/poster/PageArt';
import { isValidLocale } from '@/lib/i18n/config';
import { createPageMetadata } from '@/lib/metadata';
import { experiences, pageLabels } from '@/lib/site-content';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createPageMetadata(lang, 'experience', {
    en: {
      title: 'Experience',
      description:
        'Research and pharmaceutical experience across formulation science, quality control, and natural products.',
    },
    zh: {
      title: '学习与研究经历',
      description: '谷昱宁在药物制剂、质量控制与天然产物研究方面的科研和实践经历。',
    },
  });
}

export default async function ExperiencePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const label = pageLabels[lang];

  return (
    <div className="page-shell">
      <header className="page-heading">
        <PageArt />
        <p className="eyebrow">{lang === 'zh' ? '实践与研究' : 'Practice and research'}</p>
        <h1>{label.experience}</h1>
        <p>
          {lang === 'zh'
            ? '从天然产物药理、药品质量控制到药物制剂技术，持续积累跨机构、跨文化的研究经验。'
            : 'Experience spanning natural-product pharmacology, pharmaceutical quality control, and advanced formulation technology.'}
        </p>
      </header>

      <div className="stack-list">
        {experiences[lang].map((item) => (
          <article className="content-card" key={`${item.title}-${item.period}`}>
            <time>{item.period}</time>
            <h2>{item.title}</h2>
            <p className="organization">{item.organization}</p>
            {item.supervisor ? <p className="meta">{item.supervisor}</p> : null}
            <p>{item.description}</p>
            <div className="tag-list" aria-label={lang === 'zh' ? '相关技能' : 'Related skills'}>
              {item.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
