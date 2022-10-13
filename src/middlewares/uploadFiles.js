const multer = require("multer");
const fs = require('fs')
const path = require('path')

const createStorage = (
  entity = "products"
) => {
const folder = path.join(__dirname,`../../public/images/${entity}` )

/* Si la carpeta no existe la crea */
  if(!fs.existsSync(folder)){
    fs.mkdirSync(folder)
  }

 const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `./public/images/${entity}`);
    },
    filename: (req, file, callback) => {
      callback(null, `${entity}-${Date.now()}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, callback) => {
    if (!/image\//.test(file.mimetype)) {
    req.fileValidationError = "Archivo invalido";
      return callback(null, false);
    }
    callback(null, true);
  };

  const uploads = {}
  uploads[entity] = multer({
    storage,
    fileFilter,
  })
  
  return uploads[entity]

};

module.exports = {
  uploadImageProduct : createStorage('products'),
  uploadImageAvatar :  createStorage('avatars'),
};
