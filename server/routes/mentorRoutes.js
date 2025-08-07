const express = require('express');
const router = express.Router();
const { addMentor, getMentors } = require('../controllers/mentorController');

router.post('/add', addMentor);
router.get('/', getMentors);

module.exports = router;
