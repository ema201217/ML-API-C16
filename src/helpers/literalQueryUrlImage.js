
const literalQueryUrlImage = (req,) => {

  const urlImage = () => `${req.protocol}://${req.get("host")}/users/image/`



  [literal(`CONCAT( '${req.protocol}://${req.get("host")}/users/image/',avatar )`),'avatar']
}
