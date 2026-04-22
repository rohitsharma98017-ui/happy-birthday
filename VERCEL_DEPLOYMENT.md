# Vercel Deployment Guide

## Setup Instructions

### 1. Prerequisites
- GitHub account with the repository pushed
- Vercel account (https://vercel.com)

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"
5. Framework preset: Node.js
6. Click "Deploy"

### 3. Important Notes

#### Environment Variables (if needed)
Add to Vercel Dashboard → Project Settings → Environment Variables:
```
NODE_ENV=production
```

#### Data Persistence
**WARNING**: Vercel's serverless functions don't persist file storage between deployments. 

For production use, consider:
- **MongoDB** or **Firebase** for wishes/config storage
- **AWS S3** or **Supabase** for photo/music uploads
- **Vercel Postgres** for data persistence

#### Current Setup Limitations
- Uploaded photos/music won't persist between deployments
- Config changes reset on deployment
- Use read-only mode for production, or implement database

### 4. Optimize for Production

#### Configuration Changes
1. Set config in environment or database
2. Use CDN for static assets (music, photos)
3. Add environment-based data handling

#### Performance Tips
- Compress music files to MP3 320kbps max
- Optimize images to WebP format
- Enable caching headers for static files

### 5. Troubleshooting

**Favicon 404 error**: ✅ Fixed - returns 204 No Content

**Static files not loading**: 
- Ensure `public/` folder is committed to git
- Check vercel.json routes configuration

**API endpoints failing**:
- Verify CORS is enabled
- Check that routes point to correct Node.js handler

### 6. Local Testing Before Deploy
```bash
npm install
vercel dev
# Visit http://localhost:3000
```

---

**Status**: Ready for Vercel deployment! 🚀
