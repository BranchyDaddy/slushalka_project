import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { playlists } from '../services/api';

const PlaylistList = () => {
  const [playlistList, setPlaylistList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    playlists.getAll()
      .then(res => {
        setPlaylistList(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить плейлисты');
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom className="rainbow-heading">
          Плейлисты
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={3}>
            {playlistList.map((playlist) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={playlist.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={playlist.cover_url || '/default-playlist.jpg'}
                    alt={playlist.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {playlist.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {playlist.track_count} треков
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default PlaylistList; 