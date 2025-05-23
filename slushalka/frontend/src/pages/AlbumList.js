import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { albums } from '../services/api';

const AlbumList = () => {
  const [albumList, setAlbumList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    albums.getAll()
      .then(res => {
        setAlbumList(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить альбомы');
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom className="rainbow-heading">
          Альбомы
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={3}>
            {albumList.map((album) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={album.cover_url || '/default-album.jpg'}
                    alt={album.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {album.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {album.artist}
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

export default AlbumList; 