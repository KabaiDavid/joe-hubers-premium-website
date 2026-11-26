import images from '../data/images.gen.json';

type Manifest = Record<string, { w: number; h: number; widths: number[]; lqip: string }>;
const M = images as Manifest;

export type ImgName = keyof typeof images;

type Props = {
  name: ImgName | string;
  alt: string;
  sizes?: string;
  className?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  /** CSS object-position, e.g. "50% 30%". */
  position?: string;
  style?: React.CSSProperties;
};

const set = (name: string, widths: number[], ext: string) =>
  widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');

/** Responsive AVIF/WebP picture with a blurred placeholder underneath. */
export function Img({ name, alt, sizes = '100vw', className, priority, position, style }: Props) {
  const meta = M[name];
  if (!meta) {
    if (import.meta.env.DEV) console.warn(`Missing image: ${name}`);
    return null;
  }
  const fallback = `/img/${name}-${meta.widths[Math.min(1, meta.widths.length - 1)]}.webp`;
  return (
    <picture className={['img', className].filter(Boolean).join(' ')} style={{ backgroundImage: `url(${meta.lqip})`, ...style }}>
      <source type="image/avif" srcSet={set(name, meta.widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set(name, meta.widths, 'webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={meta.w}
        height={meta.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        style={position ? { objectPosition: position } : undefined}
        onLoad={(e) => e.currentTarget.parentElement?.classList.add('is-loaded')}
      />
    </picture>
  );
}
