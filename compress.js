import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = './public';

async function compressImages() {
  try {
    const files = fs.readdirSync(publicDir);
    
    // Find all numeric image files (e.g., 1.jpg, 2.jpeg)
    const numericPattern = /^(\d+)\.(jpg|jpeg)$/i;
    const targetFiles = [];
    
    for (const file of files) {
      const match = file.match(numericPattern);
      if (match) {
        targetFiles.push({
          name: file,
          num: parseInt(match[1], 10)
        });
      }
    }
    
    console.log(`Found ${targetFiles.length} numeric images to compress.`);
    
    for (const item of targetFiles) {
      const filePath = path.join(publicDir, item.name);
      const tempPath = path.join(publicDir, `temp_${item.name}`);
      
      const stats = fs.statSync(filePath);
      const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      console.log(`Compressing ${item.name} (Original Size: ${originalSizeMB} MB)...`);
      
      // Compress JPEG to 75% quality, progressive loading
      await sharp(filePath)
        .jpeg({ quality: 75, progressive: true, force: true })
        .toFile(tempPath);
        
      // Overwrite the original file with the compressed version
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      
      const newStats = fs.statSync(filePath);
      const newSizeKB = (newStats.size / 1024).toFixed(2);
      console.log(`Finished ${item.name} (Compressed Size: ${newSizeKB} KB)`);
    }
    
    console.log('All images have been successfully compressed and optimized!');
  } catch (error) {
    console.error('Error during image compression:', error);
  }
}

compressImages();
