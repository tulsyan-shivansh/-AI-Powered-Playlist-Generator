import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';

const Playlist = ({ mood, userId }) => {
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axios.post('/api/playlist/generate', { mood, userId });
                setPlaylist(response.data.playlist.tracks);
            } catch (err) {
                console.error('Error fetching playlist:', err);
            }
        };

        if (mood && userId) {
            fetchPlaylist();
        }
    }, [mood, userId]);

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Your Playlist
            </Typography>
            <List>
                {playlist.map((trackUri, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={trackUri} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
                Generate New Playlist
            </Button>
        </div>
    );
};

export default Playlist;