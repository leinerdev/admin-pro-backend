const express = require('express');
require('dotenv').config()
var cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor Express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json())

// Base de datos
dbConnection();

// Rutas
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/login', require('./routes/auth.routes'))
app.use('/api/hospitals', require('./routes/hospitals.routes'))
app.use('/api/doctors', require('./routes/doctors.routes'))

// Levantar el servidor
app.listen(process.env.PORT, () => {
    console.log('Server running');
});