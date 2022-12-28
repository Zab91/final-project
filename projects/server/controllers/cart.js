const db = require("../models");
const user = db.User;
const cart = db.Cart;
const product = db.Product;

module.exports = {
  addToCart: async (req, res) => {
    try {
      const { ProductId, UserId } = req.body;
      if (!UserId) throw "Please Login First";

      const data = await cart.create({
        ProductId,
        UserId,
      });
      res.status(200).send({
        massage: "Add To Cart Success",
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
