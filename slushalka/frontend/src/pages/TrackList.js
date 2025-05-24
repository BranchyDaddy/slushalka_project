import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Avatar, Box, Container, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './Home.css'; // стили для плеера

const API_URL = 'http://localhost:8000/api/tracks/'; // замени на свой адрес, если нужно

function TrackList() {
  const [tracks, setTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [trackPositions, setTrackPositions] = useState({}); // trackid: position
  const audioRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [lyricsDialog, setLyricsDialog] = useState({ open: false, lyrics: '', title: '' });

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setTracks(res.data))
      .catch(() => setTracks([]));
  }, []);

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('storage', checkAuth);
    window.addEventListener('authChanged', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChanged', checkAuth);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlay = (track) => {
    // Если уже играет этот трек — ставим на паузу и сохраняем позицию
    if (playingTrack === track.trackid) {
      if (audioRef.current) {
        const pos = audioRef.current.currentTime;
        setTrackPositions(prev => ({ ...prev, [track.trackid]: pos }));
        audioRef.current.pause();
      }
      setPlayingTrack(null);
      return;
    }

    // Если играет другой трек — останавливаем его и сохраняем позицию
    if (audioRef.current) {
      const prevId = playingTrack;
      if (prevId && audioRef.current.currentTime) {
        setTrackPositions(prev => ({ ...prev, [prevId]: audioRef.current.currentTime }));
      }
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }

    const newAudio = new window.Audio(track.audio_file);

    // Восстанавливаем позицию только после загрузки метаданных
    newAudio.addEventListener('loadedmetadata', () => {
      if (trackPositions[track.trackid]) {
        newAudio.currentTime = trackPositions[track.trackid];
      }
      newAudio.play();
    });

    newAudio.addEventListener('ended', () => {
      setPlayingTrack(null);
    });

    // Если метаданные уже загружены (например, кэш), сразу ставим позицию
    if (newAudio.readyState >= 1 && trackPositions[track.trackid]) {
      newAudio.currentTime = trackPositions[track.trackid];
      newAudio.play();
    }

    audioRef.current = newAudio;
    setPlayingTrack(track.trackid);
  };

  const openLyricsDialog = (track) => {
    setLyricsDialog({ open: true, lyrics: track.lyrics, title: track.name });
  };
  const closeLyricsDialog = () => {
    setLyricsDialog({ open: false, lyrics: '', title: '' });
  };

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
                    {track.lyrics && (
                      <>
                        <button
                          style={{ marginTop: 8, marginBottom: 4, cursor: 'pointer', background: '#e0c3fc', border: 'none', borderRadius: 4, padding: '4px 12px', color: '#4f2c91', fontWeight: 500 }}
                          onClick={() => openLyricsDialog(track)}
                        >
                          Показать текст
                        </button>
                      </>
                    )}
                  </Box>
                  {track.audio_file && (
                    isAuthenticated ? (
                      <IconButton
                        onClick={() => handlePlay(track)}
                        sx={{
                          color: '#4f2c91',
                          '&:hover': {
                            color: '#7f53ac',
                          },
                        }}
                      >
                        {playingTrack === track.trackid ? <PauseIcon /> : <PlayArrowIcon />}
                      </IconButton>
                    ) : (
                      <Typography variant="body2" sx={{ color: '#bdbdbd', fontStyle: 'italic', ml: 2 }}>
                        Только для авторизованных
                      </Typography>
                    )
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
      <Dialog open={lyricsDialog.open} onClose={closeLyricsDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{lyricsDialog.title}</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#4f2c91' }}>
            {lyricsDialog.lyrics}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLyricsDialog} color="primary" variant="contained">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TrackList; 