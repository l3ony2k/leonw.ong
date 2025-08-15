const fs = require('fs');
const path = require('path');

async function buildSingleFile() {
  try {
    // Read the original HTML file
    const htmlContent = fs.readFileSync('index.html', 'utf-8');

    // Read CSS file
    const cssContent = fs.readFileSync('css/style.css', 'utf-8');

    // Read JS files
    const configContent = fs.readFileSync('js/config.js', 'utf-8');
    const mainContent = fs.readFileSync('js/main.js', 'utf-8');

    // Create the combined HTML
    let combinedHtml = htmlContent;

    // Replace CSS link with inline styles
    const cssLinkRegex = /<link rel="stylesheet" href="css\/style\.css">/;
    const inlineCSS = `<style>\n${cssContent}\n</style>`;
    combinedHtml = combinedHtml.replace(cssLinkRegex, inlineCSS);

    // Replace JS script tags with inline scripts
    const configScriptRegex = /<script src="js\/config\.js"><\/script>/;
    const mainScriptRegex = /<script src="js\/main\.js"><\/script>/;

    const inlineConfigJS = `<script>\n${configContent}\n</script>`;
    const inlineMainJS = `<script>\n${mainContent}\n</script>`;

    combinedHtml = combinedHtml.replace(configScriptRegex, inlineConfigJS);
    combinedHtml = combinedHtml.replace(mainScriptRegex, inlineMainJS);

    // Create dist directory if it doesn't exist
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }

    // Write the combined file
    fs.writeFileSync('dist/index.html', combinedHtml);

    // Copy necessary assets (videos, images, icons, etc.)
    copyDirectory('videos', 'dist/videos');
    copyDirectory('images', 'dist/images');
    copyDirectory('assets', 'dist/assets');

    // Copy other root files
    if (fs.existsSync('favicon.ico')) {
      fs.copyFileSync('favicon.ico', 'dist/favicon.ico');
    }
    if (fs.existsSync('site.webmanifest')) {
      fs.copyFileSync('site.webmanifest', 'dist/site.webmanifest');
    }
    if (fs.existsSync('browserconfig.xml')) {
      fs.copyFileSync('browserconfig.xml', 'dist/browserconfig.xml');
    }

    console.log('✅ Build completed successfully!');
    console.log('📁 Output: dist/index.html');

    // Show file size
    const stats = fs.statSync('dist/index.html');
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  Source directory ${src} doesn't exist, skipping...`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);

  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Run the build
buildSingleFile(); 