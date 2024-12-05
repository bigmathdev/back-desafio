const multer = require('multer');
const path = require('path');
const fs = require('fs');

const pathToUploads = path.join(__dirname, 'uploads'); // Caminho para a pasta src/uploads

// Verificar se a pasta "uploads" existe dentro da pasta src, se não, cria
if (!fs.existsSync(pathToUploads)) {
  fs.mkdirSync(pathToUploads); // Cria a pasta uploads caso ela não exista
}

// Define o destino das imagens e o nome do arquivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathToUploads); // Diretório onde os arquivos serão armazenados
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname); // Pega a extensão do arquivo
    const filename = Date.now() + extname; // Define o nome do arquivo como timestamp + extensão
    cb(null, filename);
  }
});

// Filtra apenas arquivos de imagem (opcional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limita o tamanho do arquivo para 5MB
});

module.exports = upload;
