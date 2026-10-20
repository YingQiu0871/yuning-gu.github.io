import { profile, SITE_URL } from '@/lib/site-content';

export default function PersonStructuredData() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: profile.name,
    alternateName: [profile.chineseName, '盈秋', 'YingQiu0871'],
    url: SITE_URL,
    image: `${SITE_URL}/images/avatar.webp`,
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'Université Paris-Saclay',
    },
    sameAs: [
      profile.github,
      profile.orcid,
      profile.googleScholar,
      profile.linkedin,
      profile.researchGate,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(person).replace(/</g, '\\u003c'),
      }}
    />
  );
}
