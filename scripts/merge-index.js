const fs = require('fs');
const path = require('path');

// Read the React-generated index.html
const buildIndexPath = path.join(__dirname, '../build/index.html');
const publicIndexPath = path.join(__dirname, '../public/index.html');

if (fs.existsSync(buildIndexPath)) {
  let buildIndex = fs.readFileSync(buildIndexPath, 'utf8');
  
  // Check if React scripts are already included
  if (!buildIndex.includes('/static/js/main.') && !buildIndex.includes('main.js')) {
    // Read asset manifest to get the correct file names
    const manifestPath = path.join(__dirname, '../build/asset-manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      
      // Add CSS link if exists
      if (manifest.files['main.css']) {
        const cssLink = `    <link rel="stylesheet" href="${manifest.files['main.css']}" />`;
        buildIndex = buildIndex.replace('</head>', `    ${cssLink}\n  </head>`);
      }
      
      // Add JS script before closing body tag
      if (manifest.files['main.js']) {
        const jsScript = `    <script src="${manifest.files['main.js']}"></script>`;
        buildIndex = buildIndex.replace('</body>', `    ${jsScript}\n  </body>`);
      }
    }
  }
  
  // Add PWA scripts if not already present
  if (!buildIndex.includes('pwa-install.js')) {
    const pwaScripts = `    <!-- PWA Install Script -->\n    <script src="/js/pwa-install.js"></script>\n    \n    <!-- PWA Service Worker Registration -->\n    <script src="/js/service-worker-register.js"></script>`;
    buildIndex = buildIndex.replace('</body>', `    ${pwaScripts}\n  </body>`);
  }
  
  // Update meta tags from public/index.html if needed
  if (fs.existsSync(publicIndexPath)) {
    const publicIndex = fs.readFileSync(publicIndexPath, 'utf8');
    
    // Add mobile-web-app-capable if not present
    if (!buildIndex.includes('mobile-web-app-capable')) {
      const mobileMeta = '    <meta name="mobile-web-app-capable" content="yes">';
      buildIndex = buildIndex.replace('</head>', `    ${mobileMeta}\n  </head>`);
    }
  }
  
  fs.writeFileSync(buildIndexPath, buildIndex, 'utf8');
  console.log('✅ index.html merged successfully');
} else {
  console.error('❌ build/index.html not found');
  process.exit(1);
}

