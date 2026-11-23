import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n/config';
import { createPageMetadata } from '@/lib/metadata';
import { homeContent, pageLabels, projects } from '@/lib/site-content';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createPageMetadata(lang, 'research', {
    en: {
      title: 'Research',
      description:
        'Research interests in pharmaceutical technology, metabolic and cardiovascular health, natural products, and drug delivery.',
    },
    zh: {
      title: '研究方向',
      description: '谷昱宁在药物制剂技术、代谢与心血管健康、天然产物和药物递送方面的研究。',
    },
  });
}

export default async function ResearchPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const content = homeContent[lang];
  const label = pageLabels[lang];

  return (
    <div className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">{lang === 'zh' ? '药物制剂技术' : 'Pharmaceutical technology'}</p>
        <h1>{label.research}</h1>
        <p>{content.focusIntro}</p>
      </header>

      <div className="content-grid">
        {content.focusAreas.map((area) => (
          <article className="content-card" key={area.number}>
            <span className="meta">
              {area.number} {area.tag}
            </span>
            <h2>{area.title}</h2>
            <p>{area.text}</p>
          </article>
        ))}
      </div>

      <section className="page-section" aria-labelledby="projects-title">
        <h2 id="projects-title">{lang === 'zh' ? '研究项目' : 'Projects'}</h2>
        <div className="stack-list">
          {projects[lang].map((project) => (
            <article className="content-card" key={project.title}>
              <time>{project.period}</time>
              <h3>{project.title}</h3>
              <p className="organization">{project.role}</p>
              <p>{project.description}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
