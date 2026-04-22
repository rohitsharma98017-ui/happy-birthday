# 📚 Project Structure & File Guide

## Complete Project Layout

```
birthday/
├── 📄 README.md                    # Main documentation
├── 📄 QUICK_START.md               # Quick setup guide
├── 📄 DEPLOYMENT_GUIDE.md          # How to deploy online
├── 📄 CONFIGURATION_EXAMPLES.md    # Theme & message examples
├── 📄 package.json                 # Project dependencies
├── 📄 server.js                    # Backend server (Express)
├── 📄 .gitignore                   # Files to ignore in git
│
├── 📁 public/                      # Frontend files (public access)
│   ├── 📄 index.html              # Main website
│   ├── 📄 admin.html              # Admin customization panel
│   ├── 📄 styles.css              # Main page styling
│   ├── 📄 admin-styles.css        # Admin panel styling
│   ├── 📄 script.js               # Main page JavaScript
│   ├── 📄 admin-script.js         # Admin panel JavaScript
│   │
│   ├── 📁 photos/                 # Uploaded photos
│   │   └── (images placed here)
│   │
│   ├── 📁 music/                  # Background music
│   │   ├── 📄 README.md
│   │   └── background.mp3         # Add your music here
│   │
│   └── 📁 uploads/                # Other file uploads
│
└── 📁 data/                        # Database files
    ├── 📄 config.json             # Settings & customization
    └── 📄 wishes.json             # Guest birthday wishes
```

## File Descriptions

### Root Files

| File | Purpose |
|------|---------|
| `README.md` | Complete documentation with all features & deployment info |
| `QUICK_START.md` | Simple step-by-step setup guide (READ THIS FIRST!) |
| `DEPLOYMENT_GUIDE.md` | How to make website live on internet |
| `CONFIGURATION_EXAMPLES.md` | Color & message ideas to inspire you |
| `package.json` | Node.js project configuration & dependencies |
| `server.js` | Express backend server with all API endpoints |
| `.gitignore` | Tells git which files to ignore |

### Frontend Files (public/)

| File | Purpose |
|------|---------|
| `index.html` | Main website structure (HTML) |
| `admin.html` | Admin panel structure (HTML) |
| `styles.css` | Beautiful styling for main page |
| `admin-styles.css` | Admin panel design & layout |
| `script.js` | Main page functionality (JavaScript) |
| `admin-script.js` | Admin panel functionality (JavaScript) |

### Folders

| Folder | Purpose |
|--------|---------|
| `public/photos/` | Store uploaded birthday photos here |
| `public/music/` | Place background.mp3 here |
| `public/uploads/` | Other file uploads (auto-created) |
| `data/` | Database files (auto-created) |

### Data Files (data/)

| File | Purpose | Format |
|------|---------|--------|
| `config.json` | All settings: colors, messages, dates | JSON |
| `wishes.json` | Guest birthday wishes/messages | JSON |

## How Everything Connects

```
User visits http://localhost:3000/admin
                    ↓
           browser loads admin.html
                    ↓
           admin-script.js runs
                    ↓
    makes requests to server.js API
                    ↓
    server.js reads/writes data/config.json
                    ↓
    changes reflected on index.html immediately
```

## Key Technologies

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime (runs server code) |
| **Express** | Web framework for API endpoints |
| **HTML5** | Structure of web pages |
| **CSS3** | Styling & animations |
| **JavaScript** | Interactive features & animations |
| **JSON** | Data storage format |
| **Multer** | File upload handling |

## API Endpoints

The server provides these REST API endpoints:

### Configuration Endpoints
- `GET /api/config` - Fetch current settings
- `POST /api/config` - Update settings

### Wishes Endpoints
- `GET /api/wishes` - Get all wishes
- `POST /api/wishes` - Add new wish
- `DELETE /api/wishes/:id` - Delete specific wish

### Photo Endpoints
- `GET /api/photos` - Get list of photos
- `POST /api/upload-photo` - Upload new photo
- `DELETE /api/photos/:filename` - Delete photo

### Health
- `GET /api/health` - Check if server is running

## Config File Structure

```json
{
  "girlfriendName": "Her name here",
  "birthdayDate": "YYYY-MM-DD",
  "personalMessage": "Your message",
  "messages": {
    "main": "Main heading",
    "subheading": "Sub text"
  },
  "theme": {
    "primaryColor": "#ff69b4",
    "secondaryColor": "#ff1493",
    "backgroundColor": "#fff5f8",
    "textColor": "#333333"
  },
  "music": "/music/background.mp3"
}
```

## Data Storage

### Database Files
- **Format**: Plain text JSON (human-readable)
- **Location**: `/data/` folder
- **Backup**: Copy these files to backup your data
- **Edit**: Can edit directly, or use admin panel (recommended)

### Uploaded Files
- **Photos**: Stored in `/public/photos/`
- **Music**: Place in `/public/music/`
- **Uploads**: Auto-stored in `/public/uploads/`

## Customization Areas

### Colors
`data/config.json` → `theme` object
- 4 customizable colors
- Instant preview in admin panel

### Text & Messages
`data/config.json` → `messages` object
- Main birthday message
- Sub heading
- Personal love message
- Girlfriend's name

### Photos
`public/photos/` folder
- Add JPG, PNG, GIF, WebP
- Any size (auto-scales)
- Manage via admin panel

### Music
`public/music/background.mp3`
- MP3 format recommended
- See music folder README

### Wishes/Comments
`data/wishes.json` - Auto-managed
- Guest messages appear here
- Delete via admin panel

## Dependencies

These are installed when you run `npm install`:

| Package | Purpose |
|---------|---------|
| `express` | Web server framework |
| `cors` | Allow cross-origin requests |
| `body-parser` | Parse JSON/form data |
| `multer` | Handle file uploads |

## How to Modify

### Edit HTML Structure
- Edit `public/index.html` or `public/admin.html`
- Changes appear when you refresh

### Edit Styling
- Edit `public/styles.css` or `public/admin-styles.css`
- Changes appear immediately on refresh

### Edit JavaScript/Logic
- Edit `public/script.js` or `public/admin-script.js`
- Refresh to see changes

### Modify Server
- Edit `server.js`
- **Must restart** server with Ctrl+C then `npm start`

### Change Data
- **Via Admin Panel** (recommended): `http://localhost:3000/admin`
- **Directly**: Edit files in `/data/` folder

## Environment Variables

Create `.env` file for sensitive data (optional):

```
PORT=3000
NODE_ENV=development
```

Currently not required - has defaults.

## Common Customizations

### Change Page Title
- Edit `public/index.html`
- Find `<title>` tag
- Change "Happy Birthday! 🎉" to custom text

### Add Emoji
- Edit messages in admin panel
- Any emoji works: 🎉 💕 🎂 ✨

### Change Font
- Edit `public/styles.css`
- Find `font-family` property
- Change to: Georgia, Comic Sans, etc.

### Change Button Text
- Edit `public/index.html` or CSS
- Search for button labels
- Modify text

### Change Colors More
- Edit `public/styles.css`
- Look for `--primary-color` variables
- Modify CSS variables

### Add More Pages
- Create new `.html` file in `public/`
- Add routes in `server.js`
- Style with CSS

## Debugging Tips

### Check Server Logs
Terminal shows errors and requests:
```
GET /api/wishes
POST /api/config
Error: ENOENT...
```

### Check Browser Console
Press F12 → Console tab:
- JavaScript errors
- API responses
- Network issues

### Check Network Tab
F12 → Network tab:
- See API requests/responses
- Verify photos load
- Check file sizes

## File Size Guidelines

For optimal performance:
- **Photos**: 100KB - 2MB each
- **Music**: 2-8MB (MP3)
- **Typical total**: 50MB+

## Security Notes

- **Admin panel**: No password protection (add if you want)
- **Data**: Stored as plain text JSON files
- **Wishes**: User-submitted, displayed as-is
- **No database**: Uses simple JSON files

## Backup Strategy

Regularly backup these folders:
```
backup/
├── data/           # Settings & wishes
├── photos/         # Uploaded photos
└── music/          # Background music
```

## Version Control

With Git (optional but recommended):
```
git init
git add .
git commit -m "Initial commit"
git remote add origin [GitHub URL]
git push origin main
```

---

## Next Steps

1. ✅ Review this file to understand structure
2. ✅ Read QUICK_START.md for setup
3. ✅ Run `npm install` and `npm start`
4. ✅ Visit admin panel to customize
5. ✅ Add photos and music
6. ✅ Test the website
7. ✅ Deploy using DEPLOYMENT_GUIDE.md

**Everything is ready to go!** 🎉
