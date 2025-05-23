import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import './Home.css';

function Home() {
  return (
    <Container maxWidth="xl" sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" component="h1" className="rainbow-text">
          Слушалка
        </Typography>
      </Box>
    </Container>
  );
}

export default Home; 