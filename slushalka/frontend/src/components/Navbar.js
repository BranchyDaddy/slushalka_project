import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import {
  Home as HomeIcon,
  Album as AlbumIcon,
  Person as PersonIcon,
  MusicNote as MusicNoteIcon,
  PlaylistPlay as PlaylistIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MusicNoteIcon sx={{ mr: 1 }} />
            Слушалка
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
            >
              Главная
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/albums"
              startIcon={<AlbumIcon />}
            >
              Альбомы
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/artists"
              startIcon={<PersonIcon />}
            >
              Исполнители
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/tracks"
              startIcon={<MusicNoteIcon />}
            >
              Треки
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/playlists"
              startIcon={<PlaylistIcon />}
            >
              Плейлисты
            </Button>
          </Box>

          <Box sx={{ ml: 2 }}>
            {user ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/profile"
                  variant="outlined"
                  sx={{ mr: 1 }}
                >
                  Профиль
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{ mr: 1 }}
                >
                  Войти
                </Button>
                <Button
                  color="primary"
                  component={Link}
                  to="/register"
                  variant="contained"
                >
                  Регистрация
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 