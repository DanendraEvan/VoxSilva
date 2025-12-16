// This script creates placeholder mockup images for the Product page
// Run this script to generate the mockup images in the public/mockups directory

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Create mockups directory if it doesn't exist
const mockupsDir = path.join(__dirname, '../public/mockups');
if (!fs.existsSync(mockupsDir)) {
  fs.mkdirSync(mockupsDir, { recursive: true });
}

// Mockup configurations
const mockups = [
  {
    id: 1,
    name: 'Dashboard Overview',
    width: 800,
    height: 600,
    bgColor: '#f8fafc',
    textColor: '#1e293b',
    fileName: 'mockup1.png'
  },
  {
    id: 2,
    name: 'Threat Detection',
    width: 800,
    height: 600,
    bgColor: '#f1f5f9',
    textColor: '#1e293b',
    fileName: 'mockup2.png'
  },
  {
    id: 3,
    name: 'Analytics',
    width: 800,
    height: 600,
    bgColor: '#e2e8f0',
    textColor: '#1e293b',
    fileName: 'mockup3.png'
  }
];

// Function to create a mockup image
function createMockup(mockup) {
  const canvas = createCanvas(mockup.width, mockup.height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = mockup.bgColor;
  ctx.fillRect(0, 0, mockup.width, mockup.height);

  // Add some decorative elements
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  
  // Draw some lines
  for (let i = 50; i < mockup.height; i += 100) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(mockup.width, i);
    ctx.stroke();
  }

  // Add title
  ctx.fillStyle = mockup.textColor;
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(mockup.name, mockup.width / 2, 100);

  // Add subtitle
  ctx.font = '18px Arial';
  ctx.fillText('VoxSilva Pro Dashboard', mockup.width / 2, 140);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(mockupsDir, mockup.fileName), buffer);
  console.log(`Created ${mockup.fileName}`);
}

// Create all mockups
mockups.forEach(createMockup);
console.log('All mockup images have been generated in /public/mockups');
