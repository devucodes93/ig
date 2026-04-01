# 🚀 VERCEL DEPLOYMENT - COPY PASTE COMMANDS

Just copy-paste these commands in order. Done in 10 minutes!

## Step 1: Test Locally (2 min)

```bash
npm install
npm start
```

Then visit: http://localhost:3000
Test downloading a reel. If it works, press Ctrl+C to stop server.

---

## Step 2: Push to GitHub (3 min)

### First time setup:

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
git init
git add .
git commit -m "IGGrabber - Production ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/insta-reel-downloader.git
git push -u origin main
```

### Subsequent pushes:

```bash
git add .
git commit -m "Update description here"
git push
```

---

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
npm install -g vercel
vercel login
```

- Follow prompts in browser to login
- Then run:

```bash
vercel
```

- Follow the prompts:
  - Link to existing project? → No
  - Project name? → Enter name
  - Framework? → Other/Express
  - Root directory? → ./
  - Build command? → npm run build
  - Output directory? → ./
  - Environment variables? → No (skip)
- **DONE!** Your site is live!

**You'll get a URL like**: https://your-project-name.vercel.app

### Option B: GitHub Deploy (Easier)

1. Manual steps only:
   - Push to GitHub (Step 2 above)
   - Go to: https://vercel.com/new
   - Click "Import Project"
   - Paste GitHub repo URL
   - Click "Deploy"
   - **DONE!**

---

## Step 4: Check Live Site (1 min)

```bash
# Replace YOUR_DOMAIN with your Vercel URL:
curl https://your-domain.vercel.app

# In browser:
# Visit: https://your-project-name.vercel.app
# Test: Try downloading a reel
```

---

## Step 5: Connect Custom Domain (Optional, 5 min)

If you have your own domain:

1. In Vercel dashboard:
   - Project → Settings → Domains
   - Add your domain: iggrabber.com

2. Update DNS at your domain registrar:
   - Add CNAME record: cname.vercel.com
   - (Instructions vary by registrar)

3. Wait 24-48 hours for DNS propagation

---

## Step 6: Submit to Search Engines (2 min)

### Google:

```bash
# Visit:
# https://search.google.com/search-console
# Add your domain
# Verify ownership
# Submit sitemap: https://your-domain.com/sitemap.xml
```

### Bing:

```bash
# Visit:
# https://www.bing.com/webmasters
# Add site
# Submit sitemap: https://your-domain.com/sitemap.xml
```

---

## 🐛 TROUBLESHOOTING COMMANDS

### Check if npm is installed:

```bash
npm --version
node --version
```

### Check if yt-dlp is installed:

```bash
yt-dlp --version
```

### If yt-dlp not installed:

```bash
# Windows (PowerShell):
pip install yt-dlp

# Mac:
brew install yt-dlp

# Linux:
sudo apt update && sudo apt install python3-pip && pip install yt-dlp
```

### Clear npm cache:

```bash
npm cache clean --force
```

### Reinstall dependencies:

```bash
rm -r node_modules
npm install
```

### Check Vercel status:

```bash
vercel status
```

### View Vercel logs:

```bash
vercel logs
```

---

## 📊 MONITORING COMMANDS

### Check git status:

```bash
git status
```

### View git history:

```bash
git log --oneline
```

### Unstage all changes:

```bash
git reset HEAD
```

### Once deployed, check site:

```bash
# Check robots.txt:
curl https://your-domain.com/robots.txt

# Check sitemap:
curl https://your-domain.com/sitemap.xml

# Check manifest:
curl https://your-domain.com/manifest.json

# Check security.txt:
curl https://your-domain.com/.well-known/security.txt
```

---

## 🎯 FULL DEPLOYMENT SCRIPT (One Go)

Copy-paste this entire block if you're confident:

```bash
# Step 1: Test
npm install
npm start
# Test in browser, press Ctrl+C

# Step 2: Git setup (first time only)
git config user.name "Your Name"
git config user.email "your.email@example.com"
git init
git add .
git commit -m "IGGrabber production ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/insta-reel-downloader.git
git push -u origin main

# Step 3: Deploy to Vercel
npm install -g vercel
vercel login
vercel

# Step 4: Done!
echo "Site deployed! Check Vercel dashboard for URL"
```

---

## ✅ SUCCESS INDICATORS

You'll know it worked when:

- ✅ `npm install` completes without errors
- ✅ `npm start` shows "Server running: http://localhost:3000"
- ✅ Browser shows IGGrabber homepage
- ✅ Can download a test reel
- ✅ `git push` succeeds
- ✅ Vercel shows "Deployment Successful"
- ✅ Can access site at vercel.app URL

---

## 📞 HELP

**Site won't deploy?**

- Check error in Vercel dashboard
- Run `npm run build` locally
- Check if yt-dlp is installed

**Can't download reels?**

- Check if yt-dlp is installed (`yt-dlp --version`)
- Try a different Instagram URL
- Check Vercel logs: `vercel logs`

**Deployment takes too long?**

- Normal for first deploy (2-5 min)
- Check Vercel dashboard

---

**Ready?** Start with Step 1! ⬆️

If stuck, read VERCEL_DEPLOYMENT.md for detailed guide.

Good luck! 🚀
