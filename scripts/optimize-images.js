import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

const imageDir = 'public/assets/images';
const imagePattern = '**/*.{png,webp}';

async function optimizeImages() {
  try {
    const files = await glob(path.join(imageDir, imagePattern));
    if (files.length === 0) {
      console.log('No images found to optimize.');
      return;
    }

    console.log(`Found ${files.length} images to optimize.`);

    for (const file of files) {
      const originalSize = (await fs.stat(file)).size;
      const fileBuffer = await fs.readFile(file);
      let optimizedBuffer;

      const ext = path.extname(file).toLowerCase();

      if (ext === '.png') {
        optimizedBuffer = await sharp(fileBuffer)
          .png({ quality: 80, compressionLevel: 8 })
          .toBuffer();
      } else if (ext === '.webp') {
        optimizedBuffer = await sharp(fileBuffer)
          .webp({ quality: 80 })
          .toBuffer();
      } else {
        console.log(`Skipping unsupported file type: ${file}`);
        continue;
      }

      await fs.writeFile(file, optimizedBuffer);
      const newSize = (await fs.stat(file)).size;
      const reduction = originalSize - newSize;
      const reductionPercent = ((reduction / originalSize) * 100).toFixed(2);

      console.log(
        `Optimized ${file}: ${originalSize} -> ${newSize} bytes (${reductionPercent}% reduction)`
      );
    }

    console.log('Image optimization complete.');
  } catch (error) {
    console.error('Error during image optimization:', error);
  }
}

optimizeImages();
