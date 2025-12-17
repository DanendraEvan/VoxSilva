/**
 * Script untuk generate PWA icons dari logo VoxSilva
 * 
 * Requirements:
 * npm install sharp --save-dev
 * 
 * Usage:
 * node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../src/components/Header/logo.png');
const publicPath = path.join(__dirname, '../public');

// Check if logo exists
if (!fs.existsSync(logoPath)) {
    console.error('❌ Logo tidak ditemukan di:', logoPath);
    console.log('💡 Pastikan file logo.png ada di src/components/Header/');
    process.exit(1);
}

// Ensure public directory exists
if (!fs.existsSync(publicPath)) {
    console.error('❌ Folder public tidak ditemukan');
    process.exit(1);
}

console.log('🎨 Generating PWA icons...');
console.log('📁 Source:', logoPath);
console.log('📁 Destination:', publicPath);

// Generate 192x192 icon
sharp(logoPath)
    .resize(192, 192, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png()
    .toFile(path.join(publicPath, 'icon-192x192.png'))
    .then(() => {
        console.log('✅ icon-192x192.png created successfully');
    })
    .catch((err) => {
        console.error('❌ Error creating icon-192x192.png:', err);
    });

// Generate 512x512 icon
sharp(logoPath)
    .resize(512, 512, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png()
    .toFile(path.join(publicPath, 'icon-512x512.png'))
    .then(() => {
        console.log('✅ icon-512x512.png created successfully');
        console.log('\n🎉 Icons generated successfully!');
        console.log('📱 Next steps:');
        console.log('   1. Rebuild: npm run build');
        console.log('   2. Deploy: npm run deploy');
        console.log('   3. Test PWA installation');
    })
    .catch((err) => {
        console.error('❌ Error creating icon-512x512.png:', err);
    });

