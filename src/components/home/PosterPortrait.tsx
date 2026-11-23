import Image from 'next/image';

// Deterministic star positions for the poster sky (x, y, radius) on a 400 x 560 sheet.
const STARS: Array<[number, number, number]> = [
  [22, 34, 1.2], [58, 92, 0.8], [96, 22, 1.6], [134, 66, 0.9], [176, 30, 1.1], [214, 84, 0.8], [252, 18, 1.4],
  [286, 104, 0.9], [372, 132, 1.2], [384, 36, 0.8], [30, 168, 1], [62, 232, 1.5], [18, 300, 0.8], [44, 372, 1.2],
  [78, 428, 0.9], [352, 214, 1], [380, 286, 1.5], [346, 352, 0.8], [372, 410, 1.1], [318, 446, 0.9], [118, 404, 1.3],
  [162, 436, 0.8], [228, 416, 1], [276, 398, 1.4], [104, 142, 0.8], [300, 168, 1.1], [148, 108, 1.2], [200, 452, 0.8],
];

const SPARKLE = 'M0 -14 L2.4 -2.4 L14 0 L2.4 2.4 L0 14 L-2.4 2.4 L-14 0 L-2.4 -2.4 Z';

/**
 * The home page portrait as a flat poster: the portrait is the celestial body, a slate
 * orbit band passes behind and in front of it, and a capsule-shaped rocket rides the band.
 * Purely decorative drawing; the text lives in the red title band below.
 */
export default function PosterPortrait({
  name,
  label,
  title,
  body,
  location,
}: {
  name: string;
  label: string;
  title: string;
  body: string;
  location: string;
}) {
  return (
    <aside className="poster" aria-label={label}>
      <div className="poster-scene">
        <svg className="poster-layer" viewBox="0 0 400 560" aria-hidden="true" focusable="false">
          <rect className="poster-sky" width="400" height="560" />
          {STARS.map(([x, y, r]) => (
            <circle className="poster-star" key={`${x}-${y}`} cx={x} cy={y} r={r} />
          ))}
          <path className="poster-star" d={SPARKLE} transform="translate(70 128)" />
          <path className="poster-star" d={SPARKLE} transform="translate(338 300) scale(0.7)" />
          <circle className="poster-sun" cx="336" cy="62" r="24" />
          {/* far side of the orbit, behind the portrait */}
          <g transform="translate(200 250) rotate(-28)">
            <path className="poster-orbit" d="M-196 0 A196 62 0 0 1 196 0" />
          </g>
          {/* the world below, and the exhaust clouds along its rim */}
          <circle className="poster-world" cx="200" cy="940" r="470" />
          <path className="poster-land" d="M40 560 C70 520 130 500 170 516 C196 526 190 548 214 560 Z" />
          <path className="poster-land" d="M262 560 C276 530 322 512 362 524 C384 530 392 548 400 552 L400 560 Z" />
          <g className="poster-cloud">
            <circle cx="24" cy="548" r="30" />
            <circle cx="70" cy="536" r="26" />
            <circle cx="112" cy="552" r="24" />
            <circle cx="300" cy="550" r="26" />
            <circle cx="342" cy="534" r="30" />
            <circle cx="386" cy="550" r="28" />
          </g>
        </svg>

        <div className="poster-portrait">
          <Image
            src="/images/avatar.webp"
            alt={`${name} portrait`}
            width="416"
            height="416"
            priority
            sizes="(max-width: 720px) 60vw, 260px"
          />
        </div>

        <svg className="poster-layer" viewBox="0 0 400 560" aria-hidden="true" focusable="false">
          <g transform="translate(200 250) rotate(-28)">
            {/* near side of the orbit, up to the rocket */}
            <path className="poster-orbit" d="M-196 0 A196 62 0 0 0 98 53.7" />
            {/* the capsule rocket */}
            <g transform="translate(98 53.7) rotate(-10.5)">
              <path className="poster-fin" d="M-30 -11 L-46 -24 L-18 -11 Z" />
              <path className="poster-fin" d="M-30 11 L-46 24 L-18 11 Z" />
              <path className="poster-capsule-tail" d="M0 -12 L-22 -12 A12 12 0 0 0 -22 12 L0 12 Z" />
              <path className="poster-capsule-nose" d="M0 -12 L22 -12 A12 12 0 0 1 22 12 L0 12 Z" />
            </g>
          </g>
        </svg>
      </div>

      <div className="poster-band">
        <p className="card-label">{label}</p>
        <h2>{title}</h2>
        <p>{body}</p>
        <span>{location}</span>
      </div>
    </aside>
  );
}
