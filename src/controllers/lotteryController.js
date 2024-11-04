const { fetchAllLotteryData, fetchLotteryDataByName } = require('../services/lotteryService');

const getAllLotteryData = async (req, res) => {
    try {
        const data = await fetchAllLotteryData();
        res.json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lottery data' });
    }
};

// Nueva función para obtener datos de una lotería específica
const getLotteryDataByName = async (req, res) => {
    const lotteryName = req.params.name;
    try {
        const data = await fetchLotteryDataByName(lotteryName);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lottery data' });
    }
};

module.exports = { getAllLotteryData, getLotteryDataByName };
