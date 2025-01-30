const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    mood: {
        type: String,
        required: true,
    },
    tracks: {
        type: [String],
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;