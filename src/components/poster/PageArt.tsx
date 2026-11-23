import Rocket from '@/components/poster/Rocket';

// The inner pages' header picture: the home poster's vocabulary at strip size.
// Decorative only, so it is hidden from assistive technology.
const STARS: Array<[number, number, number]> = [
  [24, 40, 1.2], [70, 150, 0.9], [118, 76, 1.5], [160, 220, 1], [214, 30, 0.9], [250, 132, 1.3], [300, 250, 0.9],
  [352, 44, 1.1], [396, 186, 0.9], [452, 24, 1.4], [498, 268, 1], [618, 22, 1.1], [676, 250, 0.9], [700, 110, 1.3],
];
const SPARKLE = 'M0 -14 L2.4 -2.4 L14 0 L2.4 2.4 L0 14 L-2.4 2.4 L-14 0 L-2.4 -2.4 Z';

export default function PageArt() {
  return (
    <svg className="page-art" viewBox="0 0 720 320" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">
      <g className="art-stars">
        {STARS.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
      </g>
      <path className="art-sparkle" d={SPARKLE} transform="translate(292 58)" />
      <path className="art-sparkle" d={SPARKLE} transform="translate(668 62) scale(0.7)" />
      <circle className="art-rim" cx="556" cy="150" r="104" />
      <circle className="art-body" cx="556" cy="150" r="96" />
      <path className="art-bar-wide" d="M150 320 L720 72 L720 128 L282 320 Z" />
      <path className="art-bar-light" d="M92 320 L720 46 L720 54 L110 320 Z" />
      <path className="art-bar-red" d="M332 320 L720 151 L720 167 L369 320 Z" />
      <path className="art-course" d="M436 78 Q520 12 720 -6" />
      <path className="art-trail" d="M300 320 Q330 150 414 92 L421 100 Q352 162 340 320 Z" />
      <Rocket className="page-art-rocket" transform="translate(436 78) rotate(-39) scale(0.92)" />
    </svg>
  );
}
