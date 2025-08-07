const express = require('express');
const { postService } = require('../controllers/freelancerController');
const router = express.Router();

router.post('/', postService);

module.exports = router;