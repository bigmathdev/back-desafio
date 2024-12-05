const Product = require('../models/Product');

// Lista todos os produtos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

// Adiciona um novo produto
const createProduct = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Nome do produto é obrigatório' });
  }

  try {
    const newProduct = await Product.create({ name });
    res.status(201).json(newProduct);
  } catch (e) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

// Edita um produto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Nome do produto é obrigatório' });
  }

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    product.name = name;
    await product.save();

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: 'Erro ao editar produto' });
  }
};

// Excluir um produto
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.destroy();

    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
