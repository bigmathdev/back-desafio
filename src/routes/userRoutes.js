const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', authenticateToken, updateUser);
router.delete('/delete', authenticateToken, deleteUser);

module.exports = router;
