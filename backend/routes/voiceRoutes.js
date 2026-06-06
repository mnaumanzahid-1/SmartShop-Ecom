const express = require('express');
const router = express.Router();
const multer = require('multer');
const { handleVoiceCommand } = require('../controllers/voiceController');

// Multer Config (Temp Storage)
const upload = multer({ dest: 'uploads/' });

router.post('/command', upload.single('audio'), handleVoiceCommand);

module.exports = router;
