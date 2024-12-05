const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());


// Roteamento de usuários
app.use('/api/users', userRoutes);

// Usar as rotas de produtos
app.use('/api', productRoutes);


// Configura a pasta de uploads para ser acessada diretamente
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Sincronizar banco de dados e iniciar o servidor
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
