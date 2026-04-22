const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Setup multer for file uploads
const upload = multer({ dest: 'public/uploads/' });

// Ensure necessary directories exist
const dirs = ['public/uploads', 'public/photos', 'public/music', 'public/videos', 'data'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Load/Save configuration
const configPath = 'data/config.json';
const defaultConfig = {
  girlfriendName: 'Sweetheart',
  birthdayDate: '2026-03-14',
  theme: {
    primaryColor: '#ff69b4',
    secondaryColor: '#ff1493',
    backgroundColor: '#fff5f8',
    textColor: '#333'
  },
  music: '/music/background.mp3',
  messages: {
    main: 'Happy Birthday to my beautiful girlfriend!',
    subheading: 'A special day for a special person'
  }
};

function getConfig() {
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  return defaultConfig;
}

function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

// Initialize config if it doesn't exist
if (!fs.existsSync(configPath)) {
  saveConfig(defaultConfig);
}

// Load/Save wishes database
const wishesPath = 'data/wishes.json';

function getWishes() {
  if (fs.existsSync(wishesPath)) {
    return JSON.parse(fs.readFileSync(wishesPath, 'utf8'));
  }
  return [];
}

function saveWishes(wishes) {
  fs.writeFileSync(wishesPath, JSON.stringify(wishes, null, 2));
}

// Initialize wishes if it doesn't exist
if (!fs.existsSync(wishesPath)) {
  saveWishes([]);
}

// ============= API ENDPOINTS =============

// Get configuration
app.get('/api/config', (req, res) => {
  res.json(getConfig());
});

// Update configuration (Admin)
app.post('/api/config', (req, res) => {
  const config = getConfig();
  const updatedConfig = { ...config, ...req.body };
  saveConfig(updatedConfig);
  res.json(updatedConfig);
});

// Get all wishes
app.get('/api/wishes', (req, res) => {
  res.json(getWishes());
});

// Add a new wish
app.post('/api/wishes', (req, res) => {
  const { name, message, anonymous } = req.body;
  
  if (!message || !name) {
    return res.status(400).json({ error: 'Name and message required' });
  }

  const wishes = getWishes();
  const newWish = {
    id: Date.now(),
    name: anonymous ? 'Anonymous' : name,
    message,
    timestamp: new Date().toISOString(),
    anonymous
  };

  wishes.push(newWish);
  saveWishes(wishes);
  
  res.status(201).json(newWish);
});

// Delete a wish (Admin)
app.delete('/api/wishes/:id', (req, res) => {
  const { id } = req.params;
  let wishes = getWishes();
  wishes = wishes.filter(w => w.id != id);
  saveWishes(wishes);
  res.json({ success: true });
});

// Upload photos
app.post('/api/upload-photo', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const oldPath = req.file.path;
  const newPath = path.join('public/photos/', req.file.originalname);
  
  fs.renameSync(oldPath, newPath);
  res.json({ 
    success: true, 
    url: `/photos/${req.file.originalname}` 
  });
});

// Upload music
app.post('/api/upload-music', upload.single('music'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const oldPath = req.file.path;
  // Use custom filename if provided, otherwise use original filename
  const filename = req.body.filename || req.file.originalname;
  const newPath = path.join('public/music/', filename);
  
  // Ensure music directory exists
  if (!fs.existsSync('public/music')) {
    fs.mkdirSync('public/music', { recursive: true });
  }

  fs.renameSync(oldPath, newPath);
  res.json({ 
    success: true, 
    url: `/music/${filename}` 
  });
});

// Get list of music files
app.get('/api/music', (req, res) => {
  const musicDir = 'public/music';
  if (!fs.existsSync(musicDir)) {
    fs.mkdirSync(musicDir, { recursive: true });
    return res.json([]);
  }

  const music = fs.readdirSync(musicDir)
    .filter(file => /\.(mp3|wav|ogg|m4a|flac)$/i.test(file))
    .map(file => ({
      name: file,
      url: `/music/${file}`,
      size: (fs.statSync(path.join(musicDir, file)).size / 1024 / 1024).toFixed(2)
    }));
  
  res.json(music);
});

// Delete music file (Admin)
app.delete('/api/music/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join('public/music/', filename);
  
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Upload video
app.post('/api/upload-video', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const oldPath = req.file.path;
  const newPath = path.join('public/videos/', req.file.originalname);
  
  // Ensure videos directory exists
  if (!fs.existsSync('public/videos')) {
    fs.mkdirSync('public/videos', { recursive: true });
  }

  fs.renameSync(oldPath, newPath);
  res.json({ 
    success: true, 
    url: `/videos/${req.file.originalname}` 
  });
});

// Get video file (returns first video found)
app.get('/api/video', (req, res) => {
  const videosDir = 'public/videos';
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
    return res.json(null);
  }

  const videos = fs.readdirSync(videosDir)
    .filter(file => /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(file));
  
  if (videos.length > 0) {
    res.json({
      url: `/videos/${videos[0]}`,
      name: videos[0]
    });
  } else {
    res.json(null);
  }
});

// Get list of video files (Admin)
app.get('/api/videos', (req, res) => {
  const videosDir = 'public/videos';
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
    return res.json([]);
  }

  const videos = fs.readdirSync(videosDir)
    .filter(file => /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(file))
    .map(file => ({
      name: file,
      url: `/videos/${file}`,
      size: (fs.statSync(path.join(videosDir, file)).size / 1024 / 1024).toFixed(2)
    }));
  
  res.json(videos);
});

// Delete video file (Admin)
app.delete('/api/video/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join('public/videos/', filename);
  
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Get list of photos
app.get('/api/photos', (req, res) => {
  const photosDir = 'public/photos';
  if (!fs.existsSync(photosDir)) {
    return res.json([]);
  }

  const photos = fs.readdirSync(photosDir)
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .map(file => `/photos/${file}`);
  
  res.json(photos);
});

// Delete a photo (Admin)
app.delete('/api/photos/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join('public/photos/', filename);
  
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🎉 Birthday Wishes Server running at http://localhost:${PORT}`);
  console.log(`📱 Visit http://localhost:${PORT} for the main page`);
  console.log(`⚙️  Visit http://localhost:${PORT}/admin for customization`);
});
