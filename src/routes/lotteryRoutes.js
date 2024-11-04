const express = require('express');
const { getAllLotteryData, getLotteryDataByName } = require('../controllers/lotteryController');

const router = express.Router();

router.get('/lotteries', getAllLotteryData); // Nueva ruta para todas las loterías
router.get('/getLottery/:name', getLotteryDataByName); // Nueva ruta para obtener una lotería específica

module.exports = router;
