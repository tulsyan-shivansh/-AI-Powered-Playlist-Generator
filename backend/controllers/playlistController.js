const axios = require('axios');

// Spotify API credentials
const SPOTIFY_CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';
const SPOTIFY_CLIENT_SECRET = 'YOUR_SPOTIFY_CLIENT_SECRET';

// Get Spotify access token
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

// Search for tracks on Spotify
const searchTracksOnSpotify = async (mood, accessToken) => {
    const response = await axios.get('https://api.spotify.com/v1/search', {
        params: {
            q: mood,
            type: 'track',
            limit: 10, // Number of tracks to fetch
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
        // Get Spotify access token
        const accessToken = await getSpotifyAccessToken();

        // Search for tracks on Spotify
        const tracks = await searchTracksOnSpotify(mood, accessToken);

        // Extract track URIs (or names) for the playlist
        const trackUris = tracks.map((track) => track.uri);

        // Create a new playlist
        const playlist = new Playlist({ mood, tracks: trackUris, userId });
        await playlist.save();

        // Add playlist to user's playlists
        await User.findByIdAndUpdate(userId, { $push: { playlists: playlist._id } });

        res.json({ message: 'Playlist generated successfully.', playlist });
    } catch (err) {
        res.status(500).json({ message: 'Error generating playlist.', error: err.message });
    }
};

module.exports = { generatePlaylist };