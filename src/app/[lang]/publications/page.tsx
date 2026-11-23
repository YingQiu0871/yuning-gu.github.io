import { notFound } from 'next/navigation';
import PageArt from '@/components/poster/PageArt';
import { isValidLocale } from '@/lib/i18n/config';
import { createPageMetadata } from '@/lib/metadata';
import Authors from '@/components/Authors';
import { pageLabels, publicationNotes, publications } from '@/lib/site-content';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createPageMetadata(lang, 'publications', {
    en: {
      title: 'Publications',
      description:
        'Peer-reviewed publications by Yuning Gu in clinical epidemiology, metabolic health, natural products, and pharmacology.',
    },
    zh: {
      title: '发表论文',
      description: '谷昱宁在临床流行病学、代谢健康、天然产物与药理学方向发表的学术论文。',
    },
  });
}

export default async function PublicationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const label = pageLabels[lang];

  return (
    <div className="page-shell">
      <header className="page-heading">
        <PageArt />
        <p className="eyebrow">{lang === 'zh' ? '学术成果' : 'Research output'}</p>
        <h1>{label.publications}</h1>
        <p>
          {lang === 'zh'
            ? '研究主题横跨临床生物标志物、糖尿病、天然活性成分与药物作用机制。'
            : 'Peer-reviewed work across clinical biomarkers, diabetes, natural bioactive compounds, and mechanisms of drug action.'}
        </p>
      </header>

      <div className="stack-list">
        {publications.map((publication) => (
          <article className="content-card publication-card" key={publication.doi}>
            <div>
              <span className="meta">
                {publication.type}, {publication.date.slice(0, 4)}
              </span>
              <h2>{publication.title}</h2>
              <p className="authors">
                <Authors list={publication.authors} />
              </p>
              <p className="venue">
                {publication.venue}
                {publication.note
                  ? `, ${lang === 'zh' ? publicationNotes[publication.note] : publication.note}`
                  : ''}
              </p>
            </div>
            <a
              className="button button-secondary"
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noreferrer"
            >
              {label.doi}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
