# 🚀 Quick Start Guide

## Step 1: Install Node.js (One-time setup)
- Go to https://nodejs.org
- Download LTS version
- Run the installer and follow prompts
- Open PowerShell and verify: `node --version`

## Step 2: Open Birthday Project Folder in Terminal
- Navigate to: `C:\Users\Rohit\Desktop\birthday`
- Press Shift + Right-click → "Open PowerShell window here"

## Step 3: Install Dependencies (First time only)
```
npm install
```
This downloads everything needed (~200MB). Takes 2-3 minutes.

## Step 4: Start the Server
```
npm start
```

You should see:
```
🎉 Birthday Wishes Server running at http://localhost:3000
📱 Visit http://localhost:3000 for the main page
⚙️  Visit http://localhost:3000/admin for customization
```

## Step 5: Open in Browser

### 🎉 Main Website
- Open browser and go to: `http://localhost:3000`
- Share this with guests!

### ⚙️ Admin Panel (Customization)
- Go to: `http://localhost:3000/admin`
- This is for YOU only - keep it private!

## ✨ What You Can Customize

In the Admin Panel, you can:

1. **Basic Settings**
   - Your girlfriend's name
   - Her birthday date
   - Main birthday message
   - Personal message to her

2. **Theme Colors**
   - Pick any colors you like
   - See changes instantly!

3. **Photo Gallery**
   - Upload photos by clicking "Upload Photo"
   - Delete photos anytime
   - Photos appear on main page automatically

4. **Manage Wishes**
   - See all guest wishes
   - Delete any wish anytime

## 🎵 Add Background Music

1. Find a song online (YouTube Audio Library, BenSound, FreePD, etc.)
2. Download as MP3
3. Rename to: `background.mp3`
4. Place in: `birthday\public\music\` folder
5. Refresh the website
6. It will play automatically! 🎶

## 📸 Add Photos

**Easiest way:**
1. Go to Admin Panel: `http://localhost:3000/admin`
2. Scroll to "Photo Gallery"
3. Click "Upload Photo" and select images
4. Done! 📸

## 🎨 Customization Ideas

- **Colors**: Use your girlfriend's favorite colors
- **Photos**: Add pics of you together
- **Message**: Write something personal and romantic
- **Birthday Date**: Set to her actual birthday
- **Music**: Choose romantic background music

## 🌐 Share with Others

Once everything is set up:

1. **For Local Network** (same WiFi):
   - Get your computer IP: Open PowerShell → `ipconfig` → Find IPv4 Address
   - Share: `http://[YOUR_IP]:3000`
   - Friends on same WiFi can access

2. **For Internet** (Anywhere in World):
   - Deploy to Heroku, Railway, or Render
   - See README.md for detailed instructions
   - Share the online link with anyone!

## 🛑 How to Stop the Server

In the PowerShell where it's running, press: `Ctrl + C`

You can restart anytime with `npm start`

## ❓ Got Issues?

Common problems:

**"Port 3000 is already in use"**
- Another app is using it
- Solution: Run `npx kill-port 3000`
- Then try `npm start` again

**"npm: command not found"**
- Node.js not installed properly
- Restart your computer
- Download Node.js again from nodejs.org

**"Photos/Music not showing"**
- Make sure files are in correct folder
- Refresh the page (Ctrl + R)
- Check file formats

**Server keeps crashing**
- Check console error messages
- Make sure all files are in the right folders
- Ensure data folder exists

## 📞 Need Help?

1. Check the README.md file for detailed help
2. Look at terminal error messages (they usually tell you what's wrong)
3. Try refreshing the browser (Ctrl + R)

## 🎉 Ready to Go!

You now have a beautiful, fully customizable birthday website!

💡 **Pro Tips:**
- Make it colorful with bright pinks, purples, or golds
- Add lots of your favorite photos together
- Write a heartfelt personal message
- Pick uplifting, romantic background music
- Share the admin link with a trusted friend to help manage it

---

**Enjoy creating the perfect birthday experience!** 🎂💕
