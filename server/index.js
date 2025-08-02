require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hubbox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Test MongoDB connection route
app.get('/test-mongo', async (req, res) => {
  try {
    const connectionState = mongoose.connection.readyState;
    console.log('MongoDB connection state:', connectionState);
    
    if (connectionState === 1) {
      res.json({ 
        status: 'Connected', 
        message: 'MongoDB is connected',
        env: process.env.MONGODB_URI ? 'Environment variable set' : 'No env variable'
      });
    } else {
      res.json({ 
        status: 'Not Connected', 
        state: connectionState,
        message: 'MongoDB is not connected'
      });
    }
  } catch (error) {
    res.json({ 
      status: 'Error', 
      error: error.message 
    });
  }
});

// Import routes
const videoRoutes = require('./routes/video');
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/video', videoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);

// Add CORS headers for video files
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Sample working route (for test)
app.get('/api/video', (req, res) => {
  res.send('✅ Video API is working!');
});

// Test video route
app.get('/test-video', (req, res) => {
  res.json({ 
    message: 'Video API is working!',
    testVideo: 'https://www.w3schools.com/html/mov_bbb.mp4'
  });
});

// Example route to serve a direct video URL (if needed)
app.get('/video/:id', (req, res) => {
  const videoId = req.params.id;

  // Dummy video URL logic (replace this with your actual database or logic)
  const videoMap = {
    '1': 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video
  };

  const videoUrl = videoMap[videoId];

  if (videoUrl) {
    res.json({ video: videoUrl });
  } else {
    res.status(404).json({ error: 'Video not found' });
  }
});

// Serve React frontend ONLY for non-API routes
app.get('*', (req, res) => {
  // Don't serve React for API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  
  const indexPath = path.join(__dirname, '../client/build', 'index.html');
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json({ message: 'Frontend not built. Please check build process.' });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 