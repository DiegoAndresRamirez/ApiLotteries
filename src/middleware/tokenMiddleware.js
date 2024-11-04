require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    console.log('Token recibido:', token); // Debug
    if (!token || token !== process.env.API_TOKEN) {
        console.log('Token no válido'); // Debug
        return res.sendStatus(401); // No autorizado
    }
    console.log('Token válido'); // Debug
    next(); // Llama al siguiente middleware o ruta
};


module.exports = verifyToken;
