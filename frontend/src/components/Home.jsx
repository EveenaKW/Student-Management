import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        background: 'linear-gradient(to right, #1976d2, #42a5f5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          backgroundColor: '#ffffffee',
          borderRadius: '16px',
          maxWidth: 900,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" color="primary" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: '#333' }}>
          to the Student Management System
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          📚 Use the sidebar to view student records, add new students, and manage their data
          including attendance, marks, and more.
        </Typography>
        <Typography variant="body2" sx={{ mt: 3, fontStyle: 'italic', color: 'gray' }}>
          
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home;