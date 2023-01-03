const express = require('express');
require('dotenv').config()
var cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor Express
const app = express();

// Configurar CORS
app.use(cors());

// Base de datos
dbConnection();

// Rutas
app.get('/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

// Levantar el servidor
app.listen(process.env.PORT, () => {
    console.log('Server running');
});