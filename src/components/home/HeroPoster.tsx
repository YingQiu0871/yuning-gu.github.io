// The home hero's picture: one flat poster scene behind the headline.
// A red planet presses in from the top right, a capsule-shaped rocket climbs
// towards it on a cream exhaust trail, and the portrait is a small body in orbit.
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
      <defs>
        <clipPath id="hero-planet-clip">
          <circle cx="1290" cy="10" r="360" />
        </clipPath>
        <clipPath id="hero-moon-clip">
          <circle cx="1130" cy="612" r="92" />
        </clipPath>
      </defs>

      <g className="art-sky">
        {STAR_GROUPS.map((group, index) => (
          <g className={`art-stars art-stars-${index + 1}`} key={index}>
            {group.map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
            ))}
          </g>
        ))}
        <path className="art-sparkle" d={SPARKLE} transform="translate(742 132)" />
        <path className="art-sparkle" d={SPARKLE} transform="translate(934 236) scale(0.6)" />
        <path className="art-sparkle" d={SPARKLE} transform="translate(1368 566) scale(0.8)" />
      </g>

      <g className="art-planet">
        <circle className="art-dash" cx="1290" cy="10" r="500" />
        <circle className="art-rim" cx="1290" cy="10" r="372" />
        <circle className="art-body" cx="1290" cy="10" r="360" />
        <g clipPath="url(#hero-planet-clip)">
          <ellipse className="art-band" cx="1180" cy="150" rx="190" ry="34" transform="rotate(-16 1180 150)" />
          <ellipse className="art-band" cx="1330" cy="250" rx="150" ry="22" transform="rotate(-16 1330 250)" />
          <ellipse className="art-band" cx="1090" cy="40" rx="120" ry="20" transform="rotate(-16 1090 40)" />
          <circle className="art-band" cx="1392" cy="92" r="34" />
        </g>
      </g>

      <g className="art-flight">
        <path className="art-trail" d="M700 800 C760 620 880 470 1004 352 L1018 362 C930 480 850 630 830 800 Z" />
        <path className="art-trail" d="M606 800 C700 600 850 440 1000 346 L1004 352 C870 450 730 610 664 800 Z" />
        <path className="art-trail" d="M884 800 C892 650 940 500 1018 364 L1024 368 C972 500 944 650 952 800 Z" />
        <g transform="translate(1040 322) rotate(-46) scale(2.3)">
          <path className="art-fin" d="M-30 -11 L-48 -26 L-16 -11 Z" />
          <path className="art-fin" d="M-30 11 L-48 26 L-16 11 Z" />
          <path className="art-capsule-tail" d="M0 -12 L-22 -12 A12 12 0 0 0 -22 12 L0 12 Z" />
          <path className="art-capsule-nose" d="M0 -12 L22 -12 A12 12 0 0 1 22 12 L0 12 Z" />
        </g>
      </g>

      <g className="art-moon">
        <g transform="translate(1130 612) rotate(-20)">
          <path className="art-ring" d="M-156 0 A156 46 0 0 1 156 0" />
        </g>
        <circle className="art-rim" cx="1130" cy="612" r="98" />
        <image
          className="art-portrait"
          href="/images/avatar.webp"
          x="1038"
          y="512"
          width="184"
          height="184"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#hero-moon-clip)"
        />
        <g transform="translate(1130 612) rotate(-20)">
          <path className="art-ring" d="M-156 0 A156 46 0 0 0 156 0" />
        </g>
      </g>
    </svg>
  );
}
