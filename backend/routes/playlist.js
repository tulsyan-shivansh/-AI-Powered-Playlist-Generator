const express = require('express');
const router = express.Router();
const { generatePlaylist } = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/generate', authMiddleware, generatePlaylist);

module.exports = router;