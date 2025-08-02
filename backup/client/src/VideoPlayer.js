import React, { useState, useRef } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ErrorIcon from '@mui/icons-material/Error';

const VideoPlayer = ({ src, width = 80, height = 60, controls = true, style = {} }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleCanPlay = () => {
    setLoading(false);
  };

  const handleError = (e) => {
    console.error('Video load error:', e);
    setLoading(false);
    setError(true);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  if (error) {
    return (
      <Box 
        sx={{ 
          width, 
          height, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
          borderRadius: 1,
          border: '1px solid #e0e0e0'
        }}
      >
        <ErrorIcon sx={{ color: '#f44336', fontSize: 20 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width, height }}>
      {loading && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: 1
          }}
        >
          <CircularProgress size={20} />
        </Box>
      )}
      
      <video
        ref={videoRef}
        src={src}
        width={width}
        height={height}
        controls={controls}
        style={{
          maxHeight: height,
          borderRadius: 4,
          ...style
        }}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onPlay={handlePlay}
        onPause={handlePause}
        preload="metadata"
      />
      
      {!controls && !playing && !loading && !error && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer'
          }}
          onClick={() => videoRef.current?.play()}
        >
          <PlayArrowIcon sx={{ color: '#fff', fontSize: 30 }} />
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayer; 