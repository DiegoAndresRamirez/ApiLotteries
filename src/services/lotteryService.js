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

const fetchLotteryDataByName = async (lotteryName) => {
    const url = `https://loteriasdehoy.co/${lotteryName}`;
    return await fetchLotteryDataFromUrl(url);
};

// Extraer datos de una URL
const fetchLotteryDataFromUrl = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const ultimoResultado = $('.ultimo_resultado').text().trim();
        const firstH1 = $('.article h1').first().text().trim();

        const tablaLoteria = [];
        $('#resultados_chances tr').each((index, element) => {
            const row = [];
            const cells = $(element).find('td');

            // Verificamos cuántas celdas hay en la fila
            if (cells.length === 2 || cells.length === 3) { // Solo aceptamos filas con 2 o 3 celdas
                cells.each((i, td) => {
                    let cellText = $(td).text().trim();
                    if (cellText === 'NaN' || cellText === '') {
                        cellText = 'Sin dato'; // Reemplaza NaN o celdas vacías con un mensaje
                    }
                    // Formateamos la fecha si es la primera celda
                    if (i === 0 && cellText !== 'Sin dato') {
                        cellText = formatDate(cellText);
                    }
                    row.push(cellText);
                });

                // Solo agregar filas que tengan datos válidos
                if (row.length > 0) {
                    tablaLoteria.push(row);
                }
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

module.exports = { fetchAllLotteryData, fetchLotteryDataByName };
