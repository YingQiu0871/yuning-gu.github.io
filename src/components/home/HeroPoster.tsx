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
          <circle cx="1340" cy="-40" r="360" />
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
        <circle className="art-dash" cx="1340" cy="-40" r="500" />
        <circle className="art-rim" cx="1340" cy="-40" r="372" />
        <circle className="art-body" cx="1340" cy="-40" r="360" />
        <g clipPath="url(#hero-planet-clip)">
          <ellipse className="art-band" cx="1230" cy="100" rx="190" ry="34" transform="rotate(-16 1230 100)" />
          <ellipse className="art-band" cx="1380" cy="200" rx="150" ry="22" transform="rotate(-16 1380 200)" />
          <ellipse className="art-band" cx="1140" cy="-10" rx="120" ry="20" transform="rotate(-16 1140 -10)" />
          <circle className="art-band" cx="1420" cy="60" r="30" />
        </g>
      </g>

      {/* set back from the planet; the inner group carries the launch animation */}
      <g transform="translate(-64 66)">
        <g className="art-flight">
          <path className="art-trail" d="M700 800 C760 620 880 470 1004 352 L1018 362 C930 480 850 630 830 800 Z" />
          <path className="art-trail" d="M606 800 C700 600 850 440 1000 346 L1004 352 C870 450 730 610 664 800 Z" />
          <path className="art-trail" d="M884 800 C892 650 940 500 1018 364 L1024 368 C972 500 944 650 952 800 Z" />
          {/* the rocket, built from plain shapes: wedge, block, bands, fins */}
          <g transform="translate(1052 312) rotate(-46) scale(2.1)">
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
