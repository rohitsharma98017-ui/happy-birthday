# 🎉 Birthday Wishes Website

A beautiful, fully customizable birthday wishes website for your girlfriend! Built with Node.js/Express backend and modern HTML/CSS/JavaScript frontend.

## ✨ Features

✅ **Fully Customizable**
- Change colors, themes, and fonts
- Update girlfriend's name and birthday date
- Personalized messages

✅ **Photo Gallery**
- Upload and display special photos
- Beautiful responsive grid layout
- Full-screen photo viewer

✅ **Birthday Wishes Guestbook**
- Guests can leave messages
- Anonymous posting option
- Real-time updates

✅ **Countdown Timer**
- Live countdown to birthday
- Days, hours, minutes, seconds display

✅ **Background Music**
- Optional background music player
- Easy on/off toggle

✅ **Animations & Effects**
- Confetti animation on page load
- Smooth transitions
- Bounce effects on text
- Hover animations

✅ **Admin Panel**
- Complete customization dashboard
- Manage all content from browser
- Update settings instantly

✅ **Responsive Design**
- Works on desktop, tablet, and mobile
- Beautiful on all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js (v12 or higher) installed on your computer
- npm (comes with Node.js)

### Installation

1. **Open Terminal/PowerShell** in the birthday folder

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

   You should see:
   ```
   🎉 Birthday Wishes Server running at http://localhost:3000
   📱 Visit http://localhost:3000 for the main page
   ⚙️  Visit http://localhost:3000/admin for customization
   ```

4. **Open in browser:**
   - Main Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 🎨 Customization

### Using the Admin Panel

1. Go to http://localhost:3000/admin
2. Update all settings:
   - **Basic Settings**: Name, birthday date, messages
   - **Theme Colors**: Primary, secondary, background, text colors
   - **Photo Gallery**: Upload/delete photos
   - **Wishes Management**: View and delete wishes

### Folder Structure

```
birthday/
├── public/
│   ├── index.html           # Main page
│   ├── admin.html           # Admin panel
│   ├── styles.css           # Main page styles
│   ├── admin-styles.css     # Admin styles
│   ├── script.js            # Main page script
│   ├── admin-script.js      # Admin panel script
│   ├── photos/              # Uploaded photos
│   └── uploads/             # Other uploads
├── data/
│   ├── config.json          # Theme & settings
│   └── wishes.json          # Guest wishes
├── server.js                # Backend server
├── package.json             # Dependencies
└── README.md               # This file
```

## 🎵 Adding Background Music

1. Add your MP3 file to the `public/music/` folder
2. Name it `background.mp3` (or update the path in server.js)
3. It will play automatically (if allowed by browser)

## 📸 Adding Photos

**Option 1: Admin Panel (Easiest)**
1. Go to http://localhost:3000/admin
2. Scroll to "Photo Gallery" section
3. Click "Upload Photo"
4. Select images from your computer
5. Photos appear instantly!

**Option 2: File System**
1. Copy photos to `public/photos/` folder
2. Refresh the main page

## 🌐 Deployment (Make it Live on Internet)

### Option 1: Heroku (Free/Paid)
1. Sign up at https://www.heroku.com
2. Install Heroku CLI
3. Run these commands:
   ```bash
   heroku login
   heroku create your-app-name
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```
4. Your site will be live at `https://your-app-name.herokuapp.com`

### Option 2: GitHub Pages + Backend Service
1. Deploy backend to services like Replit, Railway, or Render
2. Update API calls to use the new backend URL

### Option 3: Your Own Web Host
1. Upload to shared hosting or VPS
2. Install Node.js on the server
3. Run `npm install && npm start`

## 🎯 Key Files Explanation

| File | Purpose |
|------|---------|
| `server.js` | Express backend server with API endpoints |
| `index.html` | Main birthday page |
| `admin.html` | Admin customization panel |
| `styles.css` | Styling for main page |
| `admin-styles.css` | Styling for admin panel |
| `script.js` | Frontend logic for main page |
| `admin-script.js` | Admin panel logic |
| `data/config.json` | All customizable settings |
| `data/wishes.json` | Guest wishes database |

## 📝 API Endpoints

### GET /api/config
- Get current configuration

### POST /api/config
- Update configuration

### GET /api/wishes
- Get all wishes

### POST /api/wishes
- Add new wish

### DELETE /api/wishes/:id
- Delete a wish

### GET /api/photos
- Get all photos

### POST /api/upload-photo
- Upload a new photo

### DELETE /api/photos/:filename
- Delete a photo

## 🎨 Color Customization

The website uses a color scheme. You can customize:
- **Primary Color**: Main accent color (heart theme)
- **Secondary Color**: Secondary accent
- **Background Color**: Page background
- **Text Color**: Main text color

Visit the admin panel to change these instantly!

## 🐛 Troubleshooting

### Server won't start
```bash
# Make sure port 3000 is free
# Try: npx kill-port 3000
# Or change port in server.js
```

### Can't see photos
- Make sure photos are in `public/photos/` folder
- Check file formats: JPG, PNG, GIF, WebP
- Refresh the page

### Admin panel not loading
- Clear browser cache
- Try a different browser
- Check console for errors (F12)

### Music not playing
- Browser may block autoplay
- Click the music button to manually start
- Check that the audio file exists

## 💡 Tips & Tricks

1. **Mobile Preview**: Open admin panel on phone to see mobile view
2. **Test Wishes**: Leave test wishes to see how they look
3. **Theme Preview**: Change colors in admin panel and see live updates
4. **Countdown Accuracy**: Make sure birthday date is in correct format (YYYY-MM-DD)
5. **Photo Quality**: Use high-quality photos for best gallery appearance

## 📱 Sharing

Once deployed online, simply share the URL with everyone!
- Main page: Share this link with guests
- Admin link: Keep admin page URL private (only for you)

## 🤝 Support

If you encounter any issues:
1. Check the terminal for error messages
2. Look at browser console (F12 → Console tab)
3. Check that all files are in the correct folders
4. Make sure Node.js is installed (`node --version`)

## 📄 License

Free to use for personal projects!

## 💝 Made with Love

Built to make your girlfriend's birthday extra special! 🎉

---

**Created Date**: March 2026
**Version**: 1.0.0
