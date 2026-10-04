import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n/config';
import { createPageMetadata } from '@/lib/metadata';
import { pageLabels, profile } from '@/lib/site-content';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createPageMetadata(lang, 'contact', {
    en: {
      title: 'Contact',
      description: 'Contact Yuning Gu for academic exchange and research collaboration.',
    },
    zh: {
      title: '联系方式',
      description: '联系谷昱宁，进行学术交流或探讨科研合作。',
    },
  });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const label = pageLabels[lang];

  return (
    <div className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">{lang === 'zh' ? '交流与合作' : 'Exchange and collaboration'}</p>
        <h1>{label.contact}</h1>
        <p>{label.contactIntro}</p>
      </header>

      <div className="contact-grid">
        <section className="contact-card">
          <h2>{lang === 'zh' ? '学术联系' : 'Academic contact'}</h2>
          <div className="contact-detail">
            <span>{label.email}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div className="contact-detail">
            <span>{label.affiliation}</span>
            <strong>
              {lang === 'zh'
                ? '巴黎萨克雷大学药学院'
                : 'Faculty of Pharmacy, Université Paris-Saclay'}
            </strong>
          </div>
          <div className="contact-detail">
            <span>{label.programme}</span>
            <strong>M2 Development of Drugs and Health Products (D2HP)</strong>
          </div>
        </section>

        <section className="contact-card">
          <h2>{label.profiles}</h2>
          <div className="contact-detail">
            <span>Google Scholar</span>
            <a href={profile.googleScholar} target="_blank" rel="noreferrer">
              Yuning Gu ↗
            </a>
          </div>
          <div className="contact-detail">
            <span>ORCID</span>
            <a href={profile.orcid} target="_blank" rel="noreferrer">
              0009-0003-2561-8122 ↗
            </a>
          </div>
          <div className="contact-detail">
            <span>LinkedIn</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              yuninggu2002 ↗
            </a>
          </div>
          <div className="contact-detail">
            <span>ResearchGate</span>
            <a href={profile.researchGate} target="_blank" rel="noreferrer">
              Yuning Gu ↗
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
