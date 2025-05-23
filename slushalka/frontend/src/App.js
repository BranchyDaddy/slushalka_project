import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AlbumList from './pages/AlbumList';
import ArtistList from './pages/ArtistList';
import TrackList from './pages/TrackList';
import PlaylistList from './pages/PlaylistList';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#a259f7',
    },
    secondary: {
      main: '#4f2c91',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255,255,255,0.85)',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #e0c3fc 0%, #a259f7 50%, #4f2c91 100%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontFamily: 'Montserrat, Arial, sans-serif',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(4px)',
        },
      },
    },
  },
});

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        position: 'relative',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        width: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        backgroundColor: '#000',
      },
      'body::before': {
        content: '""',
        position: 'fixed',
        zIndex: -1,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        background: 'linear-gradient(135deg, #000000 0%, #1e0c30 100%)',
        transition: 'background 0.3s',
        animation: 'rainbow-bg 6s linear infinite',
        backgroundSize: '200% 200%',
        backgroundRepeat: 'no-repeat',
      },
      '@keyframes rainbow-bg': {
        '0%':   { backgroundPosition: '0% 50%' },
        '33%':  { backgroundPosition: '50% 100%' },
        '66%':  { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
    }}
  />
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/albums" element={<AlbumList />} />
            <Route path="/artists" element={<ArtistList />} />
            <Route path="/tracks" element={<TrackList />} />
            <Route path="/playlists" element={<PlaylistList />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 