const path = require("path");
const { literal } = require("sequelize");
const db = require("../database/models");
const { literalQueryUrlImage } = require("../helpers/literalQueryUrlImage");

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
        include: [
          {
            association: "addresses",
            attributes: {
              exclude: ["userId", "deletedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["deletedAt", "password"],
          include: [ literalQueryUrlImage(req, "avatar", "avatar", "/users")],
        },
      };
      const user = await db.User.findByPk(id, options);

      user.name = name?.trim() || user.name;
      user.surname = surname?.trim() || user.surname;
      user.avatar = req.file?.filename || user.avatar;

      const indexAddressActive = user.addresses.findIndex(
        (address) => address.active === true
      );
      const address = user.addresses[indexAddressActive];

      address.street = street?.trim() || address.street;
      address.city = city?.trim() || address.city;
      address.province = province?.trim() || address.province;

      await user.save();
      await address.save();

      return res.status(200).json({
        ok: true,
        status: 200,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        msg: error.message || "Ocurrió un error",
      });
    }
  },

  remove: async (req, res) => {
    try {
      const userId = req.params.id || req.userToken.id;
      const removeAddress = await db.Address.destroy({
        where: { userId }/* ,force:true */
      }); /* == userId : userId */
      const removeUser = await db.User.destroy({ where: { id: userId }/* ,force:true */ });
      
      if (!removeUser || !removeAddress) {
        return res.status(404).json({
          ok: false,
          status: 404,
          msg: "Es probable que el usuario no existe",
        });
      }

      return res.status(200).json({
        ok: true,
        status: 200,
      });

    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        msg: error.message || "Server error",
      });
    }
  },
};
