import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Typography, Button } from '@mui/material';
import AudioVisualizer from '../components/AudioVisualizer';

const Player = ({ playlist }) => {
    const [currentTrack, setCurrentTrack] = useState(playlist[0] || '');

    const handleNextTrack = () => {
        const currentIndex = playlist.indexOf(currentTrack);
        const nextIndex = (currentIndex + 1) % playlist.length;
        setCurrentTrack(playlist[nextIndex]);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Now Playing
            </Typography>
            <ReactPlayer url={currentTrack} controls playing />
            <AudioVisualizer />
            <Button variant="contained" color="primary" onClick={handleNextTrack}>
                Next Track
            </Button>
        </div>
    );
};

export default Player;