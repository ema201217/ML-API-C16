const { ROL_USER } = require("../constants");
const db = require("../database/models");
const { sign } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const { literal } = require("sequelize");
const { sendJsonError } = require("../helpers/sendJsonError");
module.exports = {
  /* REGISTER CONTROLLER */
  register: async (req, res) => {
    const { name, surname, email, password, street, city, province } = req.body;

    try {
     /*  if (!email || !password) {
        return res.status(401).json({
          ok: false,
          status: 401,
        });
      } */
     
      const { id, rolId } = await db.User.create({
        name: name?.trim(),
        surname: surname?.trim(),
        email: email?.trim(),
        password: password?.trim(),  /* 123123 */ /* sdfasdgiuasgduiasd9asgdosadga$ */
        street: street?.trim(),
        city: city?.trim(),
        province: province?.trim(),
        avatar: req.file?.filename || "default.png",
        rolId: ROL_USER,
      }); 

      /* 
        errors : {
          name : "campo requerido",
          surname : "campo requerido"
        }
      */

      /* throw new Error('error en el catch') */

      await db.Address.create({
        street: name?.trim(),
        city: city?.trim(),
        province: province?.trim(),
        userId: id,
        active: true,
      });

      const token = sign({ id, rolId }, process.env.SECRET_KEY_JWT, {
        expiresIn: "4h",
      });

      return res.status(201).json({
        ok: true,
        status: 201,
        token,
      });
    } catch (error) {
      
      sendJsonError(error, res)
     /*  res.status(500).json({
        ok: false,
        status: 500,
        msg: error,
      }); */
    }
  },

  /* LOGIN CONTROLLER */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return sendJsonError("El email y password son requeridos",res,401)
       /* return res.status(401).json({
          ok: false,
          status: 401,
          msg: "El email y password son requeridos",
        }); */
      }

      const user = await db.User.findOne({ where: { email } });

      const { id, rolId, password: passwordHash } = user || { id:null, rolId:null,password:null }

      if (!user) {
        return sendJsonError("No existe ningún usuario con ese email",res,404)
       /*  return res.status(404).json({
          ok: false,
          status: 404,
          msg: "No existe ningún usuario con ese email",
        }); */
      }

      const isPassValid = await compare(password,passwordHash)

      if(!isPassValid){
        return sendJsonError("Credenciales invalidas",res)
        /* return res.status(401).json({
          ok: false,
          status: 401,
          msg: "Credenciales invalidas",
        }); */
      }

      const token = await sign({ id, rolId }, process.env.SECRET_KEY_JWT, {
        expiresIn: "4h",
      });

      res.status(200).json({
        ok: true,
        status: 200,
        token,
        urlData: `${req.protocol}://${req.get("host")}${req.baseUrl}/me/${token}`,
      });

    } catch (error) {
      sendJsonError(error,res)
     /*  res.status(500).json({
        ok: false,
        status: 500,
        msg: error.message,
      }); */
    }
  },

  /* GET USER AUTHENTICATED */
  getUserAuthenticated: async (req, res) => {
    try {
      const options = {
        include:[{
          association:'addresses',
          attributes: {
            exclude:['userId','deletedAt']
          }
        }],
        attributes: {
          exclude:['deletedAt','password'],
          include: [[literal(`CONCAT( '${req.protocol}://${req.get("host")}/users/image/',avatar )`),'avatar']]
        }
      }
      const {id} = req.userToken /* { id:1 ,rolId:2 } */
      const data = await db.User.findByPk(id,options)

      res.status(200).json({
        ok:true,
        status:200,
        data
      })
    } catch (error) {
      sendJsonError(error,res)
   /*    res.status(500).json({
        ok:false,
        status:500,
        msg: error.message || "Error en el servidor" 
      }) */

    }

  },
};
