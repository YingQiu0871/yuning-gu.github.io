import { portraitShapes } from '@/components/home/portraitShapes';

// The home hero's picture: one flat poster scene behind the headline, built on a
// single rising diagonal. A red disc stands behind a cut-out portrait (the photo
// flattened to flat tones and hard edges), three bars cross on the diagonal, and a
// rocket made of plain shapes rides the widest bar.
// Original drawing; every colour comes from the stylesheet's tokens.

// Deterministic star field (same output on every build).
function starField(count: number, seed: number): Array<[number, number, number]> {
  let s = seed;
  const next = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: count }, () => [
    Math.round(next() * 1440),
    Math.round(next() * 800),
    Math.round((0.7 + next() * 1.5) * 10) / 10,
  ]);
}

const STAR_GROUPS = [starField(46, 7), starField(40, 19), starField(34, 43)];
const SPARKLE = 'M0 -18 L3 -3 L18 0 L3 3 L0 18 L-3 3 L-18 0 L-3 -3 Z';

export default function HeroPoster({ label }: { label: string }) {
  return (
    <svg
      className="hero-art"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMaxYMid slice"
      role="img"
      aria-label={label}
      focusable="false"
    >
      <g className="art-sky">
        {STAR_GROUPS.map((group, index) => (
          <g className={`art-stars art-stars-${index + 1}`} key={index}>
            {group.map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
            ))}
          </g>
        ))}
        <path className="art-sparkle" d={SPARKLE} transform="translate(820 150)" />
        <path className="art-sparkle" d={SPARKLE} transform="translate(1010 84) scale(0.6)" />
        <path className="art-sparkle" d={SPARKLE} transform="translate(1368 160) scale(0.7)" />
      </g>

      {/* the disc behind the figure */}
      <g className="art-planet">
        <circle className="art-dash" cx="1196" cy="392" r="262" />
        <circle className="art-rim" cx="1196" cy="392" r="216" />
        <circle className="art-body" cx="1196" cy="392" r="206" />
      </g>

      {/* three bars on one rising diagonal */}
      <path className="art-bar-wide" d="M420 800 L1440 325 L1440 418 L620 800 Z" />
      <path className="art-bar-light" d="M330 800 L1440 283 L1440 297 L360 800 Z" />
      <path className="art-bar-red" d="M700 800 L1440 455 L1440 480 L753 800 Z" />

      {/* the rocket rides the wide bar; this group carries the launch animation */}
      <g className="art-flight">
        <path className="art-trail" d="M748 690 L752 706 L590 800 L470 800 Z" />
        <g transform="translate(800 672) rotate(-25) scale(1.8)">
          <path className="art-fin" d="M-26 -11 L-46 -28 L-10 -11 Z" />
          <path className="art-fin" d="M-26 11 L-46 28 L-10 11 Z" />
          <path className="art-nozzle" d="M-26 -8 L-34 -11 L-34 11 L-26 8 Z" />
          <rect className="art-hull" x="-26" y="-11" width="42" height="22" />
          <rect className="art-stripe" x="-4" y="-11" width="6" height="22" />
          <rect className="art-stripe" x="6" y="-11" width="2" height="22" />
          <circle className="art-stripe" cx="-15" cy="0" r="4.5" />
          <path className="art-wedge" d="M16 -11 L46 0 L16 11 Z" />
        </g>
      </g>

      {/* the portrait as a cut-out: silhouette with a dark keyline, the tones, then the face */}
      <g className="art-figure" transform="translate(1016 318) scale(0.62)">
        <path className="fig-light" d={portraitShapes.light} />
        <path className="fig-mid" fillRule="evenodd" d={portraitShapes.mid} />
        <path className="fig-red" fillRule="evenodd" d={portraitShapes.red} />
        <path className="fig-dark" fillRule="evenodd" d={portraitShapes.dark} />
        <path className="fig-ear" d={portraitShapes.ear} />
        <path className="fig-lips" d={portraitShapes.lips} />
        <path className="fig-dark" d={portraitShapes.lines} />
        <path className="fig-dark" d={portraitShapes.eyes} />
        <path className="fig-dark" fillRule="evenodd" d={portraitShapes.glasses} />
      </g>
    </svg>
  );
}
