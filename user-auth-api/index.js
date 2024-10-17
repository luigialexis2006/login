require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const helmet = require('helmet');
const userRoutes = require('./routes/user');

const db = require('./config/db');

const app = express();

// Middleware
app.use(helmet()); // Protege la aplicación estableciendo varias cabeceras HTTP
app.use(express.json()); // Permite que la aplicación entienda JSON

// Rutas
app.use('/api/users', userRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
