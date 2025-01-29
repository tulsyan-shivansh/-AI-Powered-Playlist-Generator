const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    mood: { type: String, required: true },
    tracks: [{ type: String }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Playlist', playlistSchema);