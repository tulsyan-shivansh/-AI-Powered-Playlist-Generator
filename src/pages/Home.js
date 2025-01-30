import React, { useState } from 'react';
import MoodInput from '../components/MoodInput';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

const Home = () => {
    const [mood, setMood] = useState('');
    const [playlist, setPlaylist] = useState(null);

    const handleMoodSubmit = async (mood) => {
        setMood(mood);
        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            const response = await axios.post(
                'http://localhost:5000/api/playlist/generate',
                { mood },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPlaylist(response.data.playlist);
        } catch (err) {
            console.error('Error generating playlist:', err);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                AI-Powered Playlist Generator
            </Typography>
            <MoodInput onSubmit={handleMoodSubmit} />
            {playlist && (
                <div>
                    <Typography variant="h5" gutterBottom>
                        Generated Playlist
                    </Typography>
                    <ul>
                        {playlist.tracks.map((track, index) => (
                            <li key={index}>{track}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Container>
    );
};

export default Home;