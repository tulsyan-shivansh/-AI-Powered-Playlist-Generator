import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const MoodInput = ({ onSubmit }) => {
    const [mood, setMood] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(mood);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Enter your mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Generate Playlist
            </Button>
        </form>
    );
};

export default MoodInput;