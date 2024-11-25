const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.listen(5000, () => {
    console.log('Servidor corriendo en http://localhost:5000');
});
