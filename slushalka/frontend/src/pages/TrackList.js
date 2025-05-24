import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Avatar, Box, Container, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { useAuth } from '../contexts/AuthContext';
import './Home.css'; // стили для плеера

const API_URL = 'http://localhost:8000/api/tracks/'; // замени на свой адрес, если нужно

function TrackList() {
  const [tracks, setTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [trackPositions, setTrackPositions] = useState({}); // trackid: position
  const audioRef = useRef(null);
  const [lyricsDialog, setLyricsDialog] = useState({ open: false, lyrics: '', title: '' });
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;
  const [micActive, setMicActive] = useState(false);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const gainNodeRef = useRef(null);
  const streamRef = useRef(null);
  const [camActive, setCamActive] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setTracks(res.data))
      .catch(() => setTracks([]));
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

  const toggleMic = async () => {
    if (!micActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.value = 2; // Усиление в 2 раза
        sourceRef.current.connect(gainNodeRef.current).connect(audioContextRef.current.destination);
        streamRef.current = stream;
        setMicActive(true);
      } catch (err) {
        alert('Не удалось получить доступ к микрофону');
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      setMicActive(false);
    }
  };

  const toggleCam = async () => {
    if (!camActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
        setCamActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert('Не удалось получить доступ к камере');
      }
    } else {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        setVideoStream(null);
      }
      setCamActive(false);
    }
  };

  useEffect(() => {
    if (camActive && videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [camActive, videoStream]);

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
      <IconButton
        onClick={toggleMic}
        sx={{
          position: 'fixed',
          left: 32,
          bottom: 32,
          color: micActive ? '#a259f7' : '#fff',
          background: micActive ? '#f3e8ff' : 'rgba(255,255,255,0.8)',
          border: micActive ? '2px solid #a259f7' : '2px solid #bdbdbd',
          zIndex: 1300,
          boxShadow: '0 4px 16px 0 rgba(80,0,120,0.15)',
          transition: 'all 0.2s',
          width: 56,
          height: 56,
        }}
      >
        {micActive ? <MicIcon /> : <MicOffIcon />}
      </IconButton>
      <IconButton
        onClick={toggleCam}
        sx={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          color: camActive ? '#a259f7' : '#fff',
          background: camActive ? '#f3e8ff' : 'rgba(255,255,255,0.8)',
          border: camActive ? '2px solid #a259f7' : '2px solid #bdbdbd',
          zIndex: 1300,
          boxShadow: '0 4px 16px 0 rgba(80,0,120,0.15)',
          transition: 'all 0.2s',
          width: 56,
          height: 56,
        }}
      >
        {camActive ? <VideocamIcon /> : <VideocamOffIcon />}
      </IconButton>
      {camActive && (
        <Box
          sx={{
            position: 'fixed',
            right: 104,
            bottom: 32,
            width: 320,
            height: 240,
            zIndex: 1400,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 4px 24px 0 rgba(80,0,120,0.25)',
            border: '4px solid transparent',
            background: 'rgba(0,0,0,0.7)',
            animation: 'rainbow-border 3s linear infinite',
            '@keyframes rainbow-border': {
              '0%': { borderColor: '#a259f7' },
              '25%': { borderColor: '#e0c3fc' },
              '50%': { borderColor: '#8ec5fc' },
              '75%': { borderColor: '#4f2c91' },
              '100%': { borderColor: '#a259f7' },
            },
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
          />
        </Box>
      )}
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