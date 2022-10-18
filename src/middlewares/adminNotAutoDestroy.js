const { ID_ADMIN } = require("../constants");

const adminNotAutoDestroy = (req, res, next) => {
  const userIdParams = +req.params.id;
  const { id } = req.userToken;

  /* NO AUTO ELIMINARSE */
  if ((userIdParams && userIdParams === ID_ADMIN) || (!userIdParams && id === ID_ADMIN)) {
    return res.status(400).json({
      ok: false,
      status: 400,
      msg: "Este usuario no puede auto eliminarse",
    });
  }

  next()
};

module.exports= {adminNotAutoDestroy}
