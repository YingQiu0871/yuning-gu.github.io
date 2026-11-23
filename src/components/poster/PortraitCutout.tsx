import PortraitFigure from '@/components/poster/PortraitFigure';

/** The cut-out portrait on its red disc, for places that show the portrait on its own. */
export default function PortraitCutout({ label }: { label: string }) {
  return (
    <svg className="portrait-cutout" viewBox="0 0 420 430" role="img" aria-label={label} focusable="false">
      <circle className="art-rim" cx="212" cy="176" r="160" />
      <circle className="art-body" cx="212" cy="176" r="150" />
      <path className="art-bar-wide" d="M0 372 L420 178 L420 232 L0 426 Z" />
      <path className="art-bar-light" d="M0 340 L420 146 L420 154 L0 348 Z" />
      <PortraitFigure transform="translate(62 44) scale(0.5)" />
    </svg>
  );
}
