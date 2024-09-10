const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
app.use(express.json());

// Definir rotas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});