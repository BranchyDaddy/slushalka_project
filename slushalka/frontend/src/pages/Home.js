import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from '@mui/material';
import {
  Album as AlbumIcon,
  Person as PersonIcon,
  MusicNote as MusicNoteIcon,
  PlaylistPlay as PlaylistIcon,
} from '@mui/icons-material';

function Home() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Добро пожаловать в Слушалку
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Ваш персональный музыкальный сервис
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={3}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="https://source.unsplash.com/random/800x600/?album"
              alt="Альбомы"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Альбомы
              </Typography>
              <Typography>
                Исследуйте коллекцию альбомов от ваших любимых исполнителей
              </Typography>
            </CardContent>
            <Box sx={{ p: 2 }}>
              <Button
                component={RouterLink}
                to="/albums"
                variant="contained"
                fullWidth
                startIcon={<AlbumIcon />}
              >
                Смотреть альбомы
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="https://source.unsplash.com/random/800x600/?artist"
              alt="Исполнители"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Исполнители
              </Typography>
              <Typography>
                Откройте для себя новых исполнителей и их творчество
              </Typography>
            </CardContent>
            <Box sx={{ p: 2 }}>
              <Button
                component={RouterLink}
                to="/artists"
                variant="contained"
                fullWidth
                startIcon={<PersonIcon />}
              >
                Смотреть исполнителей
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="https://source.unsplash.com/random/800x600/?music"
              alt="Треки"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Треки
              </Typography>
              <Typography>
                Слушайте любимые треки и открывайте новые
              </Typography>
            </CardContent>
            <Box sx={{ p: 2 }}>
              <Button
                component={RouterLink}
                to="/tracks"
                variant="contained"
                fullWidth
                startIcon={<MusicNoteIcon />}
              >
                Смотреть треки
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="https://source.unsplash.com/random/800x600/?playlist"
              alt="Плейлисты"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Плейлисты
              </Typography>
              <Typography>
                Создавайте и делитесь своими плейлистами
              </Typography>
            </CardContent>
            <Box sx={{ p: 2 }}>
              <Button
                component={RouterLink}
                to="/playlists"
                variant="contained"
                fullWidth
                startIcon={<PlaylistIcon />}
              >
                Смотреть плейлисты
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home; 