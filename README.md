# Bogen Homes Website Preview

This is a preview/testing version of the www.bogenhomes.com website, cloned for testing purposes.

## Live Preview
Visit the site at: https://edmundbogen.github.io/bogenhomes-preview/

## Repository Information
- **Repository**: https://github.com/edmundbogen/bogenhomes-preview
- **Visibility**: Public (required for GitHub Pages on free tier)
- **Source Branch**: main
- **Deployment**: GitHub Pages (automatic)

## Website Statistics
- **Total Files**: ~995 files
- **Total Size**: ~51MB
- **HTML Pages**: 109
- **CSS Files**: 26
- **JavaScript Files**: 26
- **Images**: 57+
- **WordPress Content**: Includes wp-content themes and plugins

## Content Cloned
✅ All public HTML pages
✅ CSS stylesheets (local and CDN)
✅ JavaScript files (local and CDN)
✅ Images and media assets
✅ Favicon and site icons
✅ robots.txt and sitemap

## Limitations and Notes

### Dynamic Content Not Available
The following features will **not** work on this static clone:
- ❌ **IDX/MLS Property Feeds**: Real estate listings require backend database and API integration
- ❌ **Contact Forms**: Form submissions need server-side processing (Contact Form 7)
- ❌ **WordPress Admin**: No wp-admin access or dynamic content management
- ❌ **PHP Processing**: GitHub Pages serves static files only
- ❌ **Database Queries**: No database connectivity
- ❌ **Search Functionality**: Dynamic search features won't work
- ❌ **User Authentication**: Login/registration features are non-functional

### What Works
✅ Page navigation and layout
✅ CSS styling and visual design
✅ JavaScript interactions (client-side only)
✅ Static images and media
✅ Links between pages
✅ Basic HTML content display

### External Dependencies
Some resources are loaded from external CDNs:
- Bootstrap CSS from cdn.vs12.com
- Font icons from cdn.vs12.com
- Various JavaScript libraries from CDNs

These external resources should load correctly as long as the CDN is accessible.

## Updating This Preview

To update the preview with changes from the live site:

1. Navigate to the project directory:
   ```bash
   cd ~/bogenhomes-preview/site
   ```

2. Re-download the website (you may want to backup first):
   ```bash
   # Backup current version
   cd ..
   cp -r site site-backup-$(date +%Y%m%d)
   
   # Download fresh copy
   cd site
   # Use wget or httrack to re-download
   wget --recursive --level=3 --page-requisites --convert-links \
     --backup-converted --span-hosts \
     --domains=bogenhomes.com,cdn.vs12.com \
     --wait=0.5 --random-wait \
     --reject "idx-*,*.php,login*,admin*" \
     https://bogenhomes.com/
   ```

3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update website clone - $(date +%Y-%m-%d)"
   git push origin main
   ```

4. GitHub Pages will automatically rebuild in 1-2 minutes

## Production Website
The production website remains at: **www.bogenhomes.com**

This preview site is for testing purposes only and should not be used as the primary website.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
