/** The rocket, built from plain shapes and pointing along +x; scale and place it with `transform`. */
export default function Rocket({ transform, className }: { transform?: string; className?: string }) {
  return (
    <g className={className} transform={transform}>
      <path className="art-fin" d="M-26 -11 L-46 -28 L-10 -11 Z" />
      <path className="art-fin" d="M-26 11 L-46 28 L-10 11 Z" />
      <path className="art-nozzle" d="M-26 -8 L-34 -11 L-34 11 L-26 8 Z" />
      <rect className="art-hull" x="-26" y="-11" width="42" height="22" />
      <rect className="art-stripe" x="-4" y="-11" width="6" height="22" />
      <rect className="art-stripe" x="6" y="-11" width="2" height="22" />
      <circle className="art-stripe" cx="-15" cy="0" r="4.5" />
      <path className="art-wedge" d="M16 -11 L46 0 L16 11 Z" />
    </g>
  );
}
