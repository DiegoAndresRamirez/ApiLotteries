const axios = require('axios');
const cheerio = require('cheerio');
const { lotteryUrls } = require('../config/config');

// Formatear la fecha
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// Extraer datos de una URL
const fetchLotteryDataFromUrl = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const ultimoResultado = $('.ultimo_resultado').text().trim();
        const firstH1 = $('.article h1').first().text().trim();

        const tablaLoteria = [];
        $('.tabla_loterias tr').each((index, element) => {
            const row = [];
            $(element).find('td').each((i, td) => {
                let cellText = $(td).text().trim();
                if (i === 1) {
                    cellText = formatDate(cellText);
                }
                if (i === 1 || i === 2) {
                    row.push(cellText);
                }
            });
            if (row.length) {
                tablaLoteria.push(row);
            }
        });

        return {
            url,
            ultimoResultado: ultimoResultado || 'No último resultado found',
            firstH1: firstH1 || 'No <h1> found',
            tablaLoteria: tablaLoteria.length ? tablaLoteria : 'No lottery table found',
        };
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return { url, error: 'Failed to fetch data' };
    }
};

// Función para obtener datos de todas las URLs
const fetchAllLotteryData = async () => {
    return await Promise.all(lotteryUrls.map(fetchLotteryDataFromUrl));
};

module.exports = { fetchAllLotteryData };
