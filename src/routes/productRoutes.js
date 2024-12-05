const express = require('express');
const multer = require('../upload')
const Product = require('../models/Product')

const auth = require('../middlewares/auth');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// Lista produtos
router.get('/products', auth, getAllProducts);

// Adiciona produto
router.post('/products', auth, createProduct);

// Edita produto
router.put('/products/:id', auth, updateProduct);

// Exclui produto
router.delete('/products/:id', auth, deleteProduct);

// Rota de upload de imagem do produto
router.post('/upload/:id', multer.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Nenhuma imagem foi enviada.');
    }

    // Obter a URL da imagem (aqui, será uma URL relativa)
    const imagemUrl = `/uploads/${req.file.filename}`;

    // Atualiza o produto no banco com a URL da imagem
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).send('Produto não encontrado.');
    }

    product.image = imagemUrl; // Atualiza o campo 'imagem' do produto
    await product.save();

    // Retorna a URL da imagem associada ao produto
    res.status(200).json({
      message: 'Imagem carregada com sucesso!',
      imagemUrl: imagemUrl
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao fazer upload da imagem.');
  }
});

module.exports = router;
