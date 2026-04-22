# 🌐 Deployment Guide

Learn how to make your birthday website live on the internet!

## Option 1: Heroku (Recommended for Beginners)

### Prerequisites
- GitHub account (free at https://github.com)
- Heroku account (free at https://www.heroku.com)

### Steps

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Create repository named: `birthday-wishes`
   - Initialize with no template

2. **Initialize Git in your project**
   ```
   cd c:\Users\Rohit\Desktop\birthday
   git init
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   git add .
   git commit -m "Initial commit - Birthday website"
   ```

3. **Push to GitHub**
   ```
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/birthday-wishes.git
   git push -u origin main
   ```

4. **Deploy to Heroku**
   - Go to https://dashboard.heroku.com/apps
   - Click "New" → "Create new app"
   - Name it: `your-name-birthday` (must be unique)
   - Region: Choose closest to you
   - Click "Create app"

5. **Connect to GitHub**
   - In Heroku app → "Deploy" tab
   - Click "Connect to GitHub"
   - Search for your repo: `birthday-wishes`
   - Click "Connect"
   - Scroll down → "Enable Automatic Deploys"
   - Click "Deploy Branch"

6. **Wait for Deployment**
   - Takes 2-3 minutes
   - When done, click "View"
   - Your site is LIVE! 🎉

### Your Live URL
- Heroku provides: `https://your-name-birthday.herokuapp.com`
- Share this link with everyone!

## Option 2: Railway

### Steps

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Connect Repository**
   - Click "Deploy from GitHub"
   - Select your `birthday-wishes` repo

3. **Configure Environment**
   - Add environment variable:
     - KEY: `NODE_ENV`
     - VALUE: `production`

4. **Deploy**
   - Railway automatically deploys
   - Get your custom URL

## Option 3: Render

### Steps

1. **Sign Up**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Select your `birthday-wishes` repository

3. **Configure**
   - Name: `birthday-wishes`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Deploy**
   - Click "Create Web Service"
   - Takes 2-3 minutes
   - Get your live URL

## Option 4: Replit

### Super Easy (No GitHub needed!)

1. **Go to Replit**
   - https://replit.com/@your-username

2. **Create New Repl**
   - Click "Create" → "Import from GitHub"
   - Paste your repo URL

3. **Run**
   - Click "Run"
   - Get your live URL instantly

4. **That's it!**
   - Replit handles everything

## Custom Domain (Optional)

### Add Your Own Domain Name

After deploying to any service above:

1. **Buy a Domain**
   - Namecheap.com
   - GoDaddy.com
   - Google Domains
   (Usually $10-15/year)

2. **Point Domain to Heroku/Railway/Render**
   - Each service has instructions
   - Usually just add DNS records

Example: `girlfriend-birthday.com`

## Database Backup

### Before Deploying

Your data is stored in files:
- `data/config.json` - Settings
- `data/wishes.json` - Guest wishes
- `public/photos/` - Images

**Backup these files** before deploying!

```
# Create backup folder
mkdir backup
copy data\* backup\
copy public\photos\* backup\
```

## Updating After Deployment

### Push Changes

```
git add .
git commit -m "Update: Changed colors and birthday date"
git push origin main
```

The site updates automatically!

## Keeping Server Running 24/7

**Note:** Free tiers may sleep after inactivity.

### Upgrade to Paid (Optional)
- Heroku: $7/month
- Railway: Pay-as-you-go (~$5/month)
- Render: $7/month

Or keep free tier - it slows down but still works!

## Analytics (Optional)

Track who visits:

1. **Google Analytics**
   - Go to https://analytics.google.com
   - Create property for your URL
   - Add tracking code to `public/index.html`

2. **Simple Analytics**
   - https://simpleanalytics.com
   - More privacy-friendly

## SSL Certificate

✅ **Already Included!**

All these services automatically provide HTTPS (secure connection). Your data is safe!

## Troubleshooting Deployment

### App crashes after deployment

1. **Check logs**
   - Heroku: "View logs" in dashboard
   - Railway: "Logs" tab
   - Look for error messages

2. **Common issues**
   - Missing dependencies: `npm install` was run
   - Wrong start command: Check `package.json`
   - Port issue: Make sure using `process.env.PORT`

### Photos not showing

If photos uploaded locally don't appear:

1. **Re-upload photos**
   - Use admin panel after deployment
   - Or copy to folder before pushing

2. **Note:** Free services reset files periodic
   - Better to keep uploading through admin panel

### Changes not taking effect

1. **Clear browser cache** (Ctrl + Shift + Delete)
2. **Hard refresh** (Ctrl + Shift + R)
3. **Check git push worked**: `git log`
4. **Check deployment completed**: Service dashboard

## Going Live Checklist

- [ ] Repository created on GitHub
- [ ] All files pushed to GitHub
- [ ] Deployed to Heroku/Railway/Render
- [ ] Verified site is live and working
- [ ] Customized all settings in admin panel
- [ ] Added boyfriend's personal message
- [ ] Uploaded some nice photos
- [ ] Added background music (optional)
- [ ] Tested on mobile browser
- [ ] Shared URL with friends/family

## Getting Your Site's URL

After successful deployment:

**Heroku**: 
- Go to Settings tab → Domains
- Copy the URL

**Railway/Render**: 
- Get from deployment dashboard
- Usually `your-app.railway.app` or similar

## Share Your Site!

### With Friends & Family
```
"Check out the birthday website I made: 
https://your-url.herokuapp.com"
```

### Social Media
```
📝 Made a birthday website for my girlfriend!
Check it out: https://your-url.herokuapp.com
#BirthdayWish #SpecialDay 💕
```

### In Card or Message
Print/send the URL for a sweet surprise!

---

Congratulations! Your website is now live for the whole world to see! 🌍🎉
