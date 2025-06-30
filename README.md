# Personal Website - Single-File HTML with Cloudflare Pages

This project builds a single-file HTML version of your personal website for optimal performance and SEO. The CSS and JavaScript are inlined for faster loading and better search engine crawling.

## 🎯 Why Single-File HTML?

**Benefits:**
- ✅ **Reduced HTTP requests** - Everything loads in one request
- ✅ **Better SEO** - Search engines can crawl everything at once
- ✅ **Lower hosting costs** - Fewer requests and simpler infrastructure
- ✅ **Faster perceived performance** - No render-blocking external resources
- ✅ **Simplified deployment** - One main file to worry about

**Trade-offs:**
- ❌ No caching benefits for individual assets
- ❌ Larger initial payload
- ❌ Must rebuild entire file for any changes

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Wrangler globally (if not already installed):**
   ```bash
   npm install -g wrangler
   ```

3. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

## 🔨 Build Process

The build script (`build.js`) does the following:

1. **Reads source files:**
   - `index.html` - Main HTML structure
   - `css/style.css` - All styles
   - `js/config.js` - Site configuration
   - `js/main.js` - Main functionality

2. **Inlines everything:**
   - Replaces `<link rel="stylesheet" href="css/style.css">` with `<style>...</style>`
   - Replaces `<script src="js/config.js"></script>` with `<script>...</script>`
   - Replaces `<script src="js/main.js"></script>` with `<script>...</script>`

3. **Copies assets:**
   - Videos, images, icons, and other static files to `dist/`

4. **Creates single output:**
   - `dist/index.html` - Complete standalone HTML file
   - `dist/assets/` - Static assets (videos, images, icons)

## 📋 Available Commands

```bash
# Build the single HTML file
npm run build

# Preview locally with Wrangler Pages
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

## 🚀 Deployment

### First-time setup:

1. **Configure your project name** in `wrangler.toml`:
   ```toml
   name = "your-site-name"
   ```

2. **Deploy:**
   ```bash
   npm run deploy
   ```

3. **Set up custom domain (optional):**
   - Go to Cloudflare dashboard > Pages > Your project
   - Add custom domain in the "Custom domains" section

### Regular updates:

```bash
# Make changes to source files (index.html, css/style.css, js/*.js)
# Then rebuild and deploy:
npm run deploy
```

## 📁 Project Structure

```
├── index.html          # Source HTML file
├── css/
│   └── style.css       # Source CSS file
├── js/
│   ├── config.js       # Site configuration
│   └── main.js         # Main JavaScript
├── videos/             # Video assets
├── images/             # Image assets
├── assets/             # Icons and other assets
├── build.js            # Build script
├── wrangler.toml       # Wrangler configuration
├── package.json        # NPM configuration
└── dist/               # Build output (generated)
    ├── index.html      # Single-file HTML (CSS & JS inlined)
    └── assets/         # Copied static assets
```

## 🔧 How It Works

1. **Build process** creates a single HTML file with inlined CSS and JS
2. **Cloudflare Pages** serves the built files from the `dist/` directory  
3. **Static assets** (videos, images, icons) are served normally with CDN caching
4. **SEO benefits** from having everything in one request

## 💡 Performance Tips

- The built HTML file will be ~100-200KB (reasonable for modern web)
- Videos are served as separate assets for optimal streaming
- Worker caches static assets automatically
- Consider image optimization for better performance

## 🔍 Troubleshooting

**Build fails:**
- Check that all source files exist
- Ensure file paths are correct in build script

**Deploy fails:**
- Make sure you're logged into Wrangler: `wrangler whoami`
- Check your Cloudflare account has Workers enabled

**Site doesn't load properly:**
- Check browser console for errors
- Verify all asset paths are correct
- Test locally first with `npm run preview`

**Assets not loading:**
- Ensure assets are copied to `dist/` during build
- Check file paths in HTML match actual file locations
- Verify MIME types in worker.js if needed

## 📊 Monitoring

After deployment, you can monitor your site:
- **Cloudflare Dashboard:** Pages analytics and metrics
- **Performance:** Check Core Web Vitals in browser dev tools  
- **Real User Monitoring:** Available in Cloudflare dashboard 