import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = './public';

async function compressImages() {
  try {
    const files = fs.readdirSync(publicDir);
    const targetFiles = files.filter(file => file.startsWith('images') && file.endsWith('.jpg'));

    console.log(`Found ${targetFiles.length} images to compress.`);

    for (const file of targetFiles) {
      const filePath = path.join(publicDir, file);
      const tempPath = path.join(publicDir, `temp_${file}`);

      const stats = fs.statSync(filePath);
      const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

      console.log(`Compressing ${file} (Original Size: ${originalSizeMB} MB)...`);

      // Compress JPEG to 75% quality, progressive loading
      await sharp(filePath)
        .jpeg({ quality: 75, progressive: true, force: true })
        .toFile(tempPath);

      // Overwrite the original file with the compressed version
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);

      const newStats = fs.statSync(filePath);
      const newSizeKB = (newStats.size / 1024).toFixed(2);
      console.log(`Finished ${file} (Compressed Size: ${newSizeKB} KB)`);
    }

    console.log('All images have been successfully compressed and optimized!');
  } catch (error) {
    console.error('Error during image compression:', error);
  }
}

compressImages();
