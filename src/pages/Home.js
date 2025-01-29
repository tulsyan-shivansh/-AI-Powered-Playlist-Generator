import React, { useState } from 'react';
import MoodInput from '../components/MoodInput';
import { Button, Container, Typography } from '@mui/material';

const Home = () => {
    const [mood, setMood] = useState('');

    const handleMoodSubmit = (mood) => {
        setMood(mood);
        // Call backend API to generate playlist
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                AI-Powered Playlist Generator
            </Typography>
            <MoodInput onSubmit={handleMoodSubmit} />
        </Container>
    );
};

export default Home;