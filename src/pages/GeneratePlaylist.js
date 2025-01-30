import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';

const GeneratePlaylist = () => {
    const [mood, setMood] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            console.log('Playlist generated successfully:', response.data);
        } catch (err) {
            console.error('Error generating playlist:', err);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Generate Playlist
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Mood"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Generate
                </Button>
            </form>
        </Container>
    );
};

export default GeneratePlaylist;