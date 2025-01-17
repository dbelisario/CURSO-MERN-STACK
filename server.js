const express = require('express');
const app = express();
const connection = require('./database/connection'); // Importa la conexión a la base de datos
const cors = require('cors');

const puerto = 5000;

// habilitar cors
app.use(cors({
  origin: 'http://localhost:3000', // Permite solicitudes desde localhost:3000
  methods: 'GET, POST, PUT, DELETE', // Permite los métodos HTTP que deseas
  allowedHeaders: 'Content-Type, Authorization', // Permite los encabezados necesarios
  credentials: true // Permite que las cookies se envíen con las solicitudes 
}));

// Middleware para el análisis del cuerpo de las peticiones (JSON)
app.use(express.json());

// Conecta a la base de datos
connection();

// Importa las rutas
const userRoutes = require('./routes/user');
app.use("/api/user", userRoutes); // Define el prefijo de la ruta para las rutas de usuarios

// Ruta de prueba del backend
app.get('/', (req, res) => {
  res.end('Bienvenido al servidor backend Node Server para el proyecto MERN Stack');
});

// Inicia el servidor
app.listen(puerto, () => {
  console.log(`El servidor esta corriendo correctamente en el puerto: ${puerto}`);
});