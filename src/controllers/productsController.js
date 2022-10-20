const path = require("path");
const { literal } = require("sequelize");
const db = require("../database/models");
const { sendJsonError } = require("../helpers/sendJsonError");
const controller = {
  // API -> GET IMAGE IN VIEW
  image: (req, res) => {
    res.sendFile(
      path.join(__dirname, `../../public/images/products/${req.params.img}`)
    );
  },

  // API -> ALL PRODUCTS + QUERIES
  all: async (req, res) => {
    try {
      let { page = 1, limit = 10, offset = 0 } = req.query;

      /* 1 2 3 4 5  6 7 8 9 10  11 12 13 14 15*/
      /* limit 5      1 2 3 4 5 
      offset 0 */
      /* limit 5      6 7 8 9 10 
      offset 5 */

      limit = +limit > 10 ? 10 : +limit;

      page = +page <= 0 || isNaN(page) ? 1 : +page;

      page -= 1;

      offset = page * limit;
      /* 1  *  5 */
      /* console.log(offset) */

      // console.log(offset)
      const { count, rows: products } = await db.Product.findAndCountAll({
        limit,
        offset,
        include: [
          {
            association:
              "images" /* product.images  = [{ file:nombreimage.png,productId:2,...  }] */,
            attributes: {
              include: [
                [
                  literal(
                    `CONCAT( '${req.protocol}://${req.get(
                      "host"
                    )}/products/image/',images.file )`
                  ),
                  "file",
                ],
              ],
            },
          },
          {
            association: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["updatedAt", "createdAt", "deletedAt"],
        },
      });

      const existPrev = page > 0 && offset <= count;
      /* offset 20   y mi cantidad total es de 16  == false */

      const existNext =
        Math.floor(count / limit) >= page + 1 && limit !== count;
      /*  16  /  5  =   3   >=  1   */ /* 16  !==   16 false */
      let urlPrev = null;
      let urlNext = null;

      if (existNext) {
        urlNext = `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${
          page + 2
        }`;
      }

      if (existPrev) {
        urlPrev = `${req.protocol}://${req.get("host")}${
          req.baseUrl
        }?page=${page}`;
      }

      return res.status(200).json({
        meta: {
          ok: true,
          status: 200,
        },
        data: {
          totalProducts: count,
          prev: urlPrev,
          next: urlNext,
          products,
        },
      });
    } catch (error) {
      sendJsonError(error, res);
    }
  },

  // API -> DETAIL PRODUCT
  detail: (req, res) => {},

  // API -> STORAGE PRODUCT
  store: (req, res) => {},

  // API -> UPDATE PRODUCT
  update: (req, res) => {},

  // API -> DELETE PRODUCT
  destroy: (req, res) => {},
};

module.exports = controller;
