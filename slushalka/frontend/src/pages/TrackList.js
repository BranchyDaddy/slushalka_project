import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Avatar, Box, Container } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Home.css'; // стили для плеера

const API_URL = 'http://localhost:8000/api/tracks/'; // замени на свой адрес, если нужно

function TrackList() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setTracks(res.data))
      .catch(() => setTracks([]));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom className="rainbow-heading">
          Треки
        </Typography>
        <Grid container spacing={3} direction="column">
          {tracks.map((track) => (
            <Grid item key={track.trackid}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
                  boxShadow: '0 4px 24px 0 rgba(79,44,145,0.15)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  minHeight: 140,
                  height: 140,
                  width: '100%',
                }}
              >
                <Avatar sx={{ bgcolor: '#a259f7', width: 56, height: 56, mr: 2 }}>
                  <PlayArrowIcon />
                </Avatar>
                <CardContent
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    height: '100%',
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, color: '#4f2c91' }}>
                      {track.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f53ac', fontFamily: 'Montserrat, sans-serif' }}>
                      {Array.isArray(track.artist) ? track.artist.join(', ') : track.artist} • {track.album || 'Без альбома'}
                    </Typography>
                  </Box>
                  {track.audio_file && (
                    <Box
                      sx={{
                        width: 320,
                        minWidth: 200,
                        maxWidth: 400,
                        borderRadius: 2,
                        overflow: 'hidden',
                        background: 'transparent',
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        height: 56,
                      }}
                    >
                      <AudioPlayer
                        src={track.audio_file}
                        style={{
                          background: 'transparent',
                          boxShadow: 'none',
                          color: '#fff',
                          borderRadius: 8,
                          height: 40,
                        }}
                        customAdditionalControls={[]}
                        customVolumeControls={[]}
                        layout="horizontal"
                      />
                    </Box>
                  )}
                </CardContent>
                <Typography variant="body2" sx={{ color: '#4f2c91', fontFamily: 'Montserrat, sans-serif', fontWeight: 500, minWidth: 70, textAlign: 'right' }}>
                  {track.duration}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default TrackList; 