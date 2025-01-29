const express = require('express');
const { generatePlaylist } = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Generate playlist route (protected by authentication middleware)
router.post('/generate', authMiddleware, generatePlaylist);

module.exports = router;