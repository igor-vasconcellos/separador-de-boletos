const express = require('express');
const path = require('path');
const app = express();
const boletoRoutes = require('./routes/boletoRoutes');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/zips', express.static(path.join(__dirname, 'zips')));
app.use(express.json());

// Rotas
app.use('/', boletoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
