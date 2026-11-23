import { profile } from '@/lib/site-content';

/** Renders an "A; B; C" author string with the site owner's name emphasised. */
export default function Authors({ list }: { list: string }) {
  const names = list.split('; ');
  return (
    <>
      {names.map((name, index) => (
        <span key={name}>
          {name === profile.name ? <strong className="author-self">{name}</strong> : name}
          {index < names.length - 1 ? '; ' : ''}
        </span>
      ))}
    </>
  );
}
