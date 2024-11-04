require('dotenv').config();

module.exports = {
    lotteryUrls: process.env.LOTTERY_URLS.split(','),
    port: process.env.PORT || 3000,
};
