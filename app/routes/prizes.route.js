const express = require('express');
const router = express.Router();
const controller = require('../controllers/prizes.controller')

router.get('/', controller.works)
router.get('/two-prize-consecutives', controller.getTwoPrizesConsecutives)

module.exports = router;