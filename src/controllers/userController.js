const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Cadastro de usuário
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'Usuário registrado', userId: user.id });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error: err.message });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'E-mail ou senha incorretos' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'E-mail ou senha incorretos' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao fazer o login', error: err.message });
  }
};

// Atualiza dados do usuário
const updateUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const updatedData = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (password) updatedData.password = await bcrypt.hash(password, 10);

    await user.update(updatedData);

    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao fazer atualização do usuário', error: err.message });
  }
};

// Exclui usuário
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user.destroy();
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error: err.message });
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser };
