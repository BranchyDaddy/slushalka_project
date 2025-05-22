import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, CircularProgress, Alert, Avatar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { tracks } from '../services/api';

const TrackList = () => {
  const [trackList, setTrackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    tracks.getAll()
      .then(res => {
        setTrackList(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить треки');
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#4f2c91' }}>
          Треки
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={3}>
            {trackList.map((track, idx) => (
              <Grid item xs={12} sm={6} md={4} key={track.trackid}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
                    boxShadow: '0 4px 24px 0 rgba(79,44,145,0.15)',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                  }}
                >
                  <Avatar sx={{ bgcolor: '#a259f7', width: 56, height: 56, mr: 2 }}>
                    <PlayArrowIcon />
                  </Avatar>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, color: '#4f2c91' }}>
                      {track.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f53ac', fontFamily: 'Montserrat, sans-serif' }}>
                      {Array.isArray(track.artist) ? track.artist.join(', ') : track.artist} • {track.album || 'Без альбома'}
                    </Typography>
                  </CardContent>
                  <Typography variant="body2" sx={{ color: '#4f2c91', fontFamily: 'Montserrat, sans-serif', fontWeight: 500, minWidth: 70, textAlign: 'right' }}>
                    {track.duration}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default TrackList; 