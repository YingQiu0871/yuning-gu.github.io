import { notFound } from 'next/navigation';
import PageArt from '@/components/poster/PageArt';
import { isValidLocale } from '@/lib/i18n/config';
import { createPageMetadata } from '@/lib/metadata';
import { education, pageLabels } from '@/lib/site-content';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createPageMetadata(lang, 'education', {
    en: {
      title: 'Education',
      description: 'Education and interdisciplinary training in pharmaceutical sciences and technology.',
    },
    zh: {
      title: '教育背景',
      description: '谷昱宁在药物科学、药剂学与技术领域的教育及跨学科学习经历。',
    },
  });
}

export default async function EducationPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const label = pageLabels[lang];

  return (
    <div className="page-shell">
      <header className="page-heading">
        <PageArt />
        <p className="eyebrow">{lang === 'zh' ? '学习路径' : 'Academic path'}</p>
        <h1>{label.education}</h1>
        <p>
          {lang === 'zh'
            ? '从药物制剂本科训练，到全英文国际药物科学项目，逐步拓展至药物研发与健康产品开发。'
            : 'A path from undergraduate pharmaceutics training to international, interdisciplinary study in drug development and health products.'}
        </p>
      </header>

      <div className="stack-list">
        {education[lang].map((item) => (
          <article className="content-card" key={`${item.degree}-${item.period}`}>
            <time>{item.period}</time>
            <h2>{item.degree}</h2>
            <p className="organization">{item.school}</p>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
