const path = require("path");
const { literal } = require("sequelize");
const db = require('../database/models')

module.exports = {
  // API -> GET IMAGE IN VIEW
  image: (req, res) => {
    res.sendFile(
      path.join(__dirname, `../../public/images/avatars/${req.params.img}`)
    );
  },

  update: async (req, res) => {
    const { id } = req.userToken;
    const { name, surname, street, city, province } = req.body;
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
      const user = await db.User.findByPk(id,options)
      
      user.name = name?.trim() || user.name
      user.surname = surname?.trim() || user.surname 
      user.avatar = req.file?.filename || user.avatar
      
      const indexAddressActive = user.addresses.findIndex(address => address.active === true)

      user.addresses[indexAddressActive].street = street?.trim() || user.street 
      user.addresses[indexAddressActive].city = city?.trim() || user.city 
      user.addresses[indexAddressActive].province = province?.trim() || user.province 

      await user.save()
      await user.addresses[indexAddressActive].save()

      return res.status(200).json({
        ok:true,
        status:200,
        data: user
      })
    } catch (error) {
      console.log(error);
    }
  },

  remove: async (req, res) => {},
};
