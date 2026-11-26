// Generates responsive AVIF + WebP renditions and a manifest with intrinsic
// sizes and a tiny blurred placeholder for every photo in assets/photos.
// Usage: npm run images
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets/photos';
const OUT = 'public/img';
const MANIFEST = 'src/data/images.gen.json';
const WIDTHS = [480, 800, 1200, 1600, 2048];

await fs.mkdir(OUT, { recursive: true });
const files = (await fs.readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
const manifest = {};

for (const file of files) {
  const name = file.replace(/\.[^.]+$/, '');
  const input = sharp(path.join(SRC, file)).rotate();
  const { width, height } = await input.metadata();
  const widths = WIDTHS.filter((w) => w < width);
  widths.push(Math.min(width, 2048));
  const unique = [...new Set(widths)];

  for (const w of unique) {
    const base = input.clone().resize({ width: w, withoutEnlargement: true }).sharpen({ sigma: 0.5 });
    const avif = path.join(OUT, `${name}-${w}.avif`);
    const webp = path.join(OUT, `${name}-${w}.webp`);
    await base.clone().avif({ quality: 52, effort: 5 }).toFile(avif);
    await base.clone().webp({ quality: 74, effort: 5 }).toFile(webp);
  }

  const lqip = await input.clone().resize(20).blur(1.2).webp({ quality: 40 }).toBuffer();
  const finalW = Math.min(width, 2048);
  manifest[name] = {
    w: finalW,
    h: Math.round((height / width) * finalW),
    widths: unique,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  };
  process.stdout.write(`✓ ${name} (${unique.join(', ')})\n`);
}

// Social sharing image (1200×630 JPEG)
await sharp(path.join(SRC, 'red-barn-silo.webp'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-image.jpg');

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 0) + '\n');
console.log(`\n${files.length} images → ${OUT}, manifest → ${MANIFEST}`);
