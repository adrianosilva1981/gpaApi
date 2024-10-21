const express = require('express');
const router = express.Router();
const controller = require('../controllers/prizes.controller')

router.get('/', controller.works)
router.get('/mim-max-prizes', controller.getTwoPrizesConsecutives)

module.exports = router;