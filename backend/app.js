const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const subestacionesRoutes = require('./routes/subestacionesRoutes');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/subestaciones', subestacionesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
