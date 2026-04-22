const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set request timeout for Vercel
app.set('timeout', 30000);

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public', {
  maxAge: '1d',
  etag: false
}));

// Handle favicon requests
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// ============= IN-MEMORY STORAGE (Serverless Compatible) =============
let config = {
  girlfriendName: 'Sanchita',
  birthdayDate: '2026-04-23',
  personalMessage: 'Thank you for being the best part of my life. Every moment with you is special. I love you more than words can express. Happy Birthday!',
  messages: {
    main: 'ʜᴀᴘᴘʏ ʙɪʀᴛʜᴅᴀʏ Bhagwan',
    subheading: 'A special day for my special person'
  },
  theme: {
    primaryColor: '#6c324f',
    secondaryColor: '#ec98c5',
    backgroundColor: '#d6d1d3',
    textColor: '#333333'
  },
  music: '/music/background.mp3'
};

let wishes = [];

// ============= API ENDPOINTS =============

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running on Vercel!' });
});

// Get configuration
app.get('/api/config', (req, res) => {
  try {
    res.json(config);
  } catch (error) {
    console.error('Error getting config:', error);
    res.status(500).json({ error: 'Failed to get config' });
  }
});

// Update configuration (Admin)
app.post('/api/config', (req, res) => {
  try {
    const updatedConfig = { ...config, ...req.body };
    config = updatedConfig;
    res.json(config);
  } catch (error) {
    console.error('Error updating config:', error);
    res.status(500).json({ error: 'Failed to update config' });
  }
});

// Get all wishes
app.get('/api/wishes', (req, res) => {
  try {
    res.json(wishes);
  } catch (error) {
    console.error('Error getting wishes:', error);
    res.status(500).json({ error: 'Failed to get wishes' });
  }
});

// Add a new wish
app.post('/api/wishes', (req, res) => {
  try {
    const { name, message, anonymous } = req.body;
    
    if (!message || !name) {
      return res.status(400).json({ error: 'Name and message required' });
    }

    const newWish = {
      id: Date.now(),
      name: anonymous ? 'Anonymous' : name,
      message,
      timestamp: new Date().toISOString(),
      anonymous
    };

    wishes.push(newWish);
    res.status(201).json(newWish);
  } catch (error) {
    console.error('Error adding wish:', error);
    res.status(500).json({ error: 'Failed to add wish' });
  }
});

// Delete a wish (Admin)
app.delete('/api/wishes/:id', (req, res) => {
  try {
    const { id } = req.params;
    wishes = wishes.filter(w => w.id != id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting wish:', error);
    res.status(500).json({ error: 'Failed to delete wish' });
  }
});

// Get list of photos
app.get('/api/photos', (req, res) => {
  try {
    // Return empty array - photos would need to be stored in external service
    res.json([]);
  } catch (error) {
    console.error('Error getting photos:', error);
    res.status(500).json({ error: 'Failed to get photos' });
  }
});

// Get list of videos
app.get('/api/videos', (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error('Error getting videos:', error);
    res.status(500).json({ error: 'Failed to get videos' });
  }
});

// Get main video
app.get('/api/video', (req, res) => {
  try {
    res.json({ url: null });
  } catch (error) {
    console.error('Error getting video:', error);
    res.status(500).json({ error: 'Failed to get video' });
  }
});

// Get list of music files
app.get('/api/music', (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error('Error getting music:', error);
    res.status(500).json({ error: 'Failed to get music' });
  }
});

// Placeholder endpoints for uploads (would need external service)
app.post('/api/upload-photo', (req, res) => {
  res.status(501).json({ error: 'Photo uploads require external storage service (e.g., AWS S3, Supabase)' });
});

app.post('/api/upload-music', (req, res) => {
  res.status(501).json({ error: 'Music uploads require external storage service (e.g., AWS S3, Supabase)' });
});

app.post('/api/upload-video', (req, res) => {
  res.status(501).json({ error: 'Video uploads require external storage service (e.g., AWS S3, Supabase)' });
});

// Delete endpoints return not found
app.delete('/api/music/:filename', (req, res) => {
  res.status(404).json({ error: 'File not found' });
});

app.delete('/api/video/:filename', (req, res) => {
  res.status(404).json({ error: 'File not found' });
});

app.delete('/api/photos/:filename', (req, res) => {
  res.status(404).json({ error: 'File not found' });
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Export for Vercel serverless
module.exports = app;

// Start server (for local development)
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`🎉 Birthday Wishes Server running at http://localhost:${PORT}`);
    console.log(`📱 Visit http://localhost:${PORT} for the main page`);
    console.log(`⚙️  Visit http://localhost:${PORT}/admin for customization`);
    console.log(`✅ Serverless-compatible (Vercel ready)`);
  });

  // Error handling
  server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
}
