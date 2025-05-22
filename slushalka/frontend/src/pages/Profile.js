import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Avatar, Button } from '@mui/material';
import { user as userApi } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    userApi.getProfile().then(res => setProfile(res.data));
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{ width: 100, height: 100, mr: 3 }}
              alt="Profile Picture"
            />
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {profile ? profile.username : 'Имя пользователя'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {profile ? profile.email : 'email@example.com'}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Мои плейлисты
            </Typography>
            {/* TODO: Добавить список плейлистов */}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Избранные треки
            </Typography>
            {/* TODO: Добавить список избранных треков */}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Button variant="outlined" color="primary">
              Редактировать профиль
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile; 