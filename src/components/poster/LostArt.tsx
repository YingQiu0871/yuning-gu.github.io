import Rocket from '@/components/poster/Rocket';

// The 404 picture: the dashed course still points at the planet, and the rocket has peeled away from it.
// Decorative only, so it is hidden from assistive technology.
const STARS: Array<[number, number, number]> = [
  [40, 70, 1.6], [130, 300, 1.2], [210, 130, 2], [290, 520, 1.3], [380, 60, 1.4], [450, 380, 1.8], [540, 180, 1.2],
  [610, 660, 1.5], [690, 90, 1.9], [760, 300, 1.2], [850, 720, 1.4], [900, 120, 1.6], [1010, 520, 1.2],
  [1090, 720, 1.8], [1180, 500, 1.3], [1290, 560, 1.6], [1380, 470, 1.2], [1410, 60, 1.7], [980, 40, 1.2],
];
const SPARKLE = 'M0 -14 L2.4 -2.4 L14 0 L2.4 2.4 L0 14 L-2.4 2.4 L-14 0 L-2.4 -2.4 Z';

export default function LostArt() {
  return (
    <svg className="lost-art" viewBox="0 0 1440 800" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">
      <g className="art-stars art-stars-1">
        {STARS.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
      </g>
      <path className="art-sparkle" d={SPARKLE} transform="translate(820 150) scale(1.3)" />
      <path className="art-sparkle" d={SPARKLE} transform="translate(1310 470) scale(0.8)" />
      <path className="art-bar-wide" d="M1000 800 L1440 560 L1440 660 L1183 800 Z" />
      <path className="art-bar-light" d="M940 800 L1440 527 L1440 537 L958 800 Z" />
      <path className="art-bar-red" d="M1230 800 L1440 685 L1440 705 L1267 800 Z" />
      <circle className="art-rim" cx="1220" cy="250" r="180" />
      <circle className="art-body" cx="1220" cy="250" r="170" />
      <path className="art-course" d="M660 800 Q720 500 940 350 Q1000 310 1050 290" />
      <path className="lost-trail" d="M770 600 Q890 410 1000 480 Q1070 530 1040 650" />
      <g transform="translate(1040 650) rotate(104)">
        <Rocket className="lost-rocket" />
      </g>
    </svg>
  );
}
