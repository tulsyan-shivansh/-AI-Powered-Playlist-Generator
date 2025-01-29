const axios = require('axios');
const Playlist = require('../models/Playlist');
const User = require('../models/User');

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const getSpotifyAccessToken = async () => {
    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
            },
        }
    );
    return response.data.access_token;
};

const searchTracksOnSpotify = async (mood, accessToken) => {
    const response = await axios.get('https://api.spotify.com/v1/search', {
        params: {
            q: mood,
            type: 'track',
            limit: 10,
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.tracks.items;
};

const generatePlaylist = async (req, res) => {
    const { mood } = req.body;
    const userId = req.userId;

    try {
        const accessToken = await getSpotifyAccessToken();
        const tracks = await searchTracksOnSpotify(mood, accessToken);
        const trackUris = tracks.map((track) => track.uri);

        const playlist = new Playlist({ mood, tracks: trackUris, userId });
        await playlist.save();

        await User.findByIdAndUpdate(userId, { $push: { playlists: playlist._id } });

        res.json({ message: 'Playlist generated successfully.', playlist });
    } catch (err) {
        res.status(500).json({ message: 'Error generating playlist.', error: err.message });
    }
};

module.exports = { generatePlaylist };