import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = './public';

async function compressImages() {
  try {
    const files = fs.readdirSync(publicDir);
    
    // 1. Process "final" / "fina" files
    const finalPattern = /^fina(l)?\s*(\d+)\.(jpg|jpeg)$/i;
    const finalFiles = [];
    
    for (const file of files) {
      const match = file.match(finalPattern);
      if (match) {
        const num = match[2];
        finalFiles.push({
          originalName: file,
          num: parseInt(num, 10),
          targetName: `final${num}.jpg`
        });
      }
    }
    
    console.log(`Found ${finalFiles.length} final images to process.`);
    
    for (const item of finalFiles) {
      const srcPath = path.join(publicDir, item.originalName);
      const targetPath = path.join(publicDir, item.targetName);
      const tempPath = path.join(publicDir, `temp_${item.targetName}`);
      
      const stats = fs.statSync(srcPath);
      const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      console.log(`Compressing final image: ${item.originalName} -> ${item.targetName} (Original Size: ${originalSizeMB} MB)...`);
      
      // Compress to JPEG 75% quality
      await sharp(srcPath)
        .jpeg({ quality: 75, progressive: true, force: true })
        .toFile(tempPath);
        
      // Delete the original file
      if (fs.existsSync(srcPath)) {
        fs.unlinkSync(srcPath);
      }
      
      // If the target file already exists and is different from srcPath, delete it to avoid conflicts
      if (srcPath !== targetPath && fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
      }
      
      // Rename temp to target
      fs.renameSync(tempPath, targetPath);
      
      const newStats = fs.statSync(targetPath);
      const newSizeKB = (newStats.size / 1024).toFixed(2);
      console.log(`Finished ${item.targetName} (Compressed Size: ${newSizeKB} KB)`);
    }

    // 2. Process "images" files
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
