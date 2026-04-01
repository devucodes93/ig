# IGGrabber - Vercel Deployment Guide

## ✅ Quick Start for Vercel

### Step 1: Prerequisites

- [ ] GitHub account with this repo pushed
- [ ] Vercel account (free at vercel.com)
- [ ] yt-dlp installed on your system (for local testing)

### Step 2: Prepare for Deployment

#### Update domain references in files:

1. **`public/index.html`** (3 places):

   ```html
   <link rel="canonical" href="https://YOUR_DOMAIN/" />
   <meta property="og:url" content="https://YOUR_DOMAIN/" />
   <meta name="twitter:url" content="https://YOUR_DOMAIN/" />
   ```

2. **`public/.well-known/security.txt`**:

   ```
   Canonical: https://YOUR_DOMAIN/.well-known/security.txt
   ```

3. **`public/robots.txt`** (update sitemap URL):
   ```
   Sitemap: https://YOUR_DOMAIN/sitemap.xml
   ```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
npm install -g vercel
vercel login
vercel deploy
```

#### Option B: Connect GitHub Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select "Import Git Repository"
3. Choose your GitHub repo
4. Click "Deploy"
5. Vercel auto-detects Express.js configuration

#### Option C: Manual Upload

1. Go to [vercel.com/new](https://vercel.com/new)
2. Upload project folder directly
3. Vercel handles the rest

---

## ⚠️ IMPORTANT: Vercel Limitations & Solutions

### Limitation 1: Execution Time

**Problem**: Vercel functions timeout after:

- **Free Plan**: 60 seconds
- **Pro Plan**: 60 seconds
- **Enterprise**: 900 seconds

**Solution**: Large video downloads will fail. Consider:

1. **Use Vercel Pro** ($20/month) for 60-second limit
2. **Stream downloads** instead of buffering entire file
3. **Use AWS Lambda** (via Vercel) for longer execution

### Limitation 2: Temporary Storage

**Problem**: `/tmp` directory is transient and limited

**Solution**: The code already handles this - files are cleaned up automatically.

### Limitation 3: Environment Variables

**Problem**: yt-dlp and cookies need to be available

**Solution**: Already configured in `vercel.json`

### Limitation 4: Cold Starts

**Problem**: First request takes 5-10 seconds

**Solution**: This is normal for serverless. Upgrade to Pro for faster cold starts.

---

## 🔧 Environment Variables (Set in Vercel Dashboard)

### Dashboard Setup:

1. Go to Project Settings → Environment Variables
2. Add these variables:

```
NODE_ENV = production
PORT = 3000
DOMAIN = your-domain.com
LOG_LEVEL = info
```

### Optional (for future analytics):

```
GOOGLE_ANALYTICS_ID = UA-XXXXX-X
ENABLE_CORS = true
```

---

## 📋 Configuration Files Explained

### `vercel.json` (Already Created)

- Tells Vercel how to build and deploy
- Configures security headers
- Routes all requests to server.js

### `Procfile` (Already Created)

- For Heroku compatibility (optional)
- Vercel uses vercel.json instead

### `.env.example` (Already Created)

- Template for environment variables
- **Never commit `.env` file**

---

## 🚀 Deployment Checklist

- [ ] Update domain in 3 HTML files
- [ ] Update domain in robots.txt
- [ ] Create favicon.png (192x192 & 512x512)
- [ ] Create og-image.png (1200x630)
- [ ] Test locally: `npm start`
- [ ] Push to GitHub (if using GitHub option)
- [ ] Login to Vercel
- [ ] Connect GitHub or upload project
- [ ] Set environment variables in Vercel dashboard
- [ ] Wait for deployment (2-5 minutes)
- [ ] Test live site

---

## 📊 Testing Before Deployment

```bash
# Install dependencies
npm install

# Start the server
npm start

# Test endpoints in browser
# http://localhost:3000 - Main page
# http://localhost:3000/robots.txt - Check robots
# http://localhost:3000/sitemap.xml - Check sitemap
# http://localhost:3000/manifest.json - Check manifest

# Test API
# http://localhost:3000/api/info?url=https://www.instagram.com/reel/...
```

---

## 🐛 Common Issues & Fixes

### Issue 1: "yt-dlp command not found"

**Solution**:

- yt-dlp must be installed on Vercel's Linux environment
- Add `npm` package: `install-yt-dlp` or use system binary
- **Better**: Use API-based approach (see below)

### Issue 2: "Download fails after 60 seconds"

**Solution**:

- Upgrade Vercel plan or implement streaming
- Consider Vercel Pro ($20/month)
- Or use a different backend service

### Issue 3: "Cookies.txt file not found"

**Solution**:

- Create empty cookies.txt in root directory
- yt-dlp will still work without it
- Or commit cookies.txt to GitHub

### Issue 4: "CORS errors"

**Solution**:

- Already configured in server.js ✓
- Check if API is reachable: `curl https://your-domain.com/api/info`

---

## 📈 Performance Optimization

### Already Configured ✓

- ✅ Static file caching (1 year for assets)
- ✅ HTML caching (1 hour)
- ✅ API response no-cache headers
- ✅ Security headers configured
- ✅ Gzip compression

### To Add (Optional):

1. **Use Vercel Analytics**: Monitor performance
2. **Enable Web Vitals**: Track user experience
3. **Use CDN**: Image optimization with Vercel's built-in CDN

---

## 🔐 Security for Production

### Already Configured ✓

- ✅ Security headers (X-Frame-Options, etc.)
- ✅ Input validation for URLs
- ✅ CORS properly configured
- ✅ No sensitive data in code

### To Add Before Going Live:

1. **SSL/HTTPS**: Automatic with Vercel ✓
2. **Rate Limiting**: Add to server.js (optional)
3. **Monitoring**: Set up error tracking (Sentry, LogRocket)
4. **Backups**: GitHub is your backup

---

## 📱 PWA Configuration

Your app is already configured as a PWA (Progressive Web App):

- ✅ Manifest.json created
- ✅ Service worker ready (optional: add one)
- ✅ Mobile-friendly (responsive design)
- ✅ Can be installed on home screen

---

## 📊 Search Engine Optimization

Already Optimized for SEO ✓

- ✅ robots.txt configured
- ✅ sitemap.xml ready
- ✅ Meta tags added
- ✅ Open Graph tags for social sharing
- ✅ Schema.org JSON-LD structured data
- ✅ Semantic HTML

### After Deployment:

1. **Submit to Google Search Console**:
   - Go to: https://search.google.com/search-console
   - Add your domain
   - Upload sitemap.xml
   - Verify ownership

2. **Submit to Bing Webmaster**:
   - Go to: https://www.bing.com/webmasters
   - Add your domain
   - Upload sitemap.xml

---

## 💰 Costs on Vercel (Free Tier Works!)

### Free Plan Includes:

- ✅ Unlimited deployments
- ✅ Unlimited bandwidth
- ✅ Serverless functions (60s timeout)
- ✅ Edge Network (auto CDN)
- ✅ Free SSL/HTTPS
- ✅ Automatic deployments from GitHub

### Pro Plan ($20/month) Adds:

- ✅ 60-second function timeout (same as free for Functions)
- ✅ Priority support
- ✅ Advanced analytics
- ✅ Team features

**Recommendation**: Start free, upgrade to Pro if downloads are timing out.

---

## 🛠️ Custom Domain Setup

1. **Domain Registrar** (GoDaddy, Namecheap, etc.):
   - Change nameservers to:
     - `ns1.vercel.com`
     - `ns2.vercel.com`

2. **Or Use CNAME** (if keeping registrar):
   - Create CNAME record: `cname.vercel.com`

3. **In Vercel Dashboard**:
   - Project Settings → Domains
   - Add your custom domain
   - Wait for DNS propagation (can take 5-48 hours)

---

## 📞 Support & Monitoring

### Enable Vercel Analytics:

```bash
npm install @vercel/analytics
```

Then add to your HTML or Node app to track performance.

### Monitor Logs:

- Vercel Dashboard → Deployments → Select deployment → Logs
- Real-time function logs
- Error tracking

### Error Tracking (Optional):

- Install Sentry: `npm install @sentry/node`
- Get errors sent to your email

---

## ✨ Final Reminders

1. **HTTPS**: Automatic with Vercel ✓
2. **Domain**: Update all 4 places with your actual domain
3. **Favicon**: Add favicon.png to `/public`
4. **Testing**: Test all endpoints before going live
5. **Monitoring**: Check Vercel dashboard after deployment
6. **SEO**: Submit sitemaps to search engines 1-2 days after launch

---

## 🎉 You're Ready!

Your IGGrabber app is now optimized for Vercel. Deploy with confidence!

**Questions?** Check Vercel docs: https://vercel.com/docs

**Last Updated**: April 1, 2026
