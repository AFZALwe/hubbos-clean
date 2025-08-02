import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField } from '@mui/material';
import VideoPlayer from './VideoPlayer';

const VideoTest = () => {
  const [videoUrl, setVideoUrl] = useState('https://www.w3schools.com/html/mov_bbb.mp4');
  const [testUrl, setTestUrl] = useState('');

  const testUrls = [
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Video Test Component
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Test Video Player
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {testUrls.map((url, index) => (
              <Button
                key={index}
                variant="outlined"
                size="small"
                onClick={() => setVideoUrl(url)}
              >
                Test {index + 1}
              </Button>
            ))}
          </Box>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Video Player:
          </Typography>
          <VideoPlayer 
            src={videoUrl}
            width={400}
            height={300}
            controls={true}
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Native HTML Video:
          </Typography>
          <video 
            src={videoUrl}
            width={400}
            height={300}
            controls
            style={{ border: '1px solid #ccc' }}
          />
        </Box>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Server Test
        </Typography>
        
        <Button
          variant="contained"
          onClick={async () => {
            try {
              const response = await fetch('https://hubboxbackend.onrender.com/test-video');
              const data = await response.json();
              console.log('Server test response:', data);
              alert('Server test successful! Check console for details.');
            } catch (error) {
              console.error('Server test error:', error);
              alert('Server test failed! Check console for details.');
            }
          }}
          sx={{ mr: 2 }}
        >
          Test Server Connection
        </Button>
        
        <Button
          variant="contained"
          onClick={() => {
            setTestUrl('https://hubboxbackend.onrender.com/uploads/test.mp4');
          }}
        >
          Test Uploaded Video
        </Button>
      </Paper>
    </Box>
  );
};

export default VideoTest; 