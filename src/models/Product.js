const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definição do modelo de Produto
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O nome do produto não pode ser vazio'
      },
    },
  },
  image: {
    type: DataTypes.STRING, // Este é o campo onde a URL da imagem será salva
    allowNull: true // Permite que o produto seja cadastrado mesmo sem uma imagem
  }
}, {
  timestamps: true,  // Gera colunas createdAt e updatedAt automaticamente
});

module.exports = Product;
