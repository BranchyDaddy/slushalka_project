import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { artists } from '../services/api';

const ArtistList = () => {
  const [artistList, setArtistList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    artists.getAll()
      .then(res => {
        setArtistList(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить исполнителей');
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Исполнители
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={3}>
            {artistList.map((artist) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={artist.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={artist.photo_url || '/default-artist.jpg'}
                    alt={artist.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {artist.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {artist.genre}
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

export default ArtistList; 