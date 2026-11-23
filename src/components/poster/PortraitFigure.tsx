import { portraitShapes } from '@/components/home/portraitShapes';

/**
 * The portrait as a hard-edged cut-out: silhouette with a dark keyline, the flat tones,
 * then the face. Drawn in the portrait's own coordinates (585 x 786); place it with the
 * `transform` of the surrounding SVG.
 */
export default function PortraitFigure({ transform }: { transform?: string }) {
  return (
    <g className="art-figure" transform={transform}>
      <path className="fig-light" d={portraitShapes.light} />
      <path className="fig-mid" fillRule="evenodd" d={portraitShapes.mid} />
      <path className="fig-red" fillRule="evenodd" d={portraitShapes.red} />
      <path className="fig-shade" d={portraitShapes.neck} />
      <path className="fig-ear" d={portraitShapes.chin} />
      <path className="fig-dark" fillRule="evenodd" d={portraitShapes.dark} />
      <path className="fig-ear" d={portraitShapes.ear} />
      <path className="fig-lips" d={portraitShapes.lips} />
      <path className="fig-dark" d={portraitShapes.lines} />
      <path className="fig-eye" d={portraitShapes.eyewhite} />
      <path className="fig-dark" d={portraitShapes.iris} />
      <path className="fig-dark" d={portraitShapes.lid} />
      <path className="fig-dark" fillRule="evenodd" d={portraitShapes.glasses} />
    </g>
  );
}
