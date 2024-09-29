import db from "../config/Database.js";
import ProductCart from "../models/productCart.js";
import Product from "../models/productModel.js";
import Users from "../models/userModels.js";

export const addCart = async (req, res) => {
  const { userId, productId, qty } = req.body;
  const checkProduct = await Product.count({
    where: {
      id: productId,
    },
  });
  if (checkProduct < 1)
    return res.status(404).json({ msg: "Product Not Found" });
  const checkUser = await Users.count({
    where: {
      id: userId,
    },
  });
  if (checkUser < 1) return res.status(404).json({ msg: "User Not Found" });
  const checkCart = await ProductCart.findOne({
    where: {
      productId: productId,
      userId: userId,
    },
  });
  if (checkCart) {
    checkCart.setDataValue(
      "qty",
      parseFloat(checkCart.dataValues.qty) + parseFloat(qty)
    );
    await checkCart.save();
    // checkCart.setDataValue(
    //   "qty",
    //   parseFloat(checkCart.dataValues.qty) + parseFloat(qty)
    // );
    // await checkCart.save();
  } else {
    const newCartProduct = {
      userId: userId,
      productId: productId,
      qty: qty,
    };
    const newState = await ProductCart.create(newCartProduct);
    await newState.save();
  }
  return res.status(200).json({ msg: "OK" });
};

export const getCart = async (req, res) => {
  const { userId } = req.params;

  const checkUser = await Users.count({
    where: {
      id: userId,
    },
  });
  if (checkUser < 1) return res.status(404).json({ msg: "User Not Found" });
  const cartData = await db.query(`
    select c.cartId,c.productId,c.userId,p.name as 'ProductName',k.nameKategori as 'Kategori',p.price,c.qty,p.price * c.qty as 'Total_Harga' from product_cart c inner join product p on c.productId=p.id left join kategori k on p.kategori_id=k.id
    where c.userId='${userId}';
    `);

  return res.status(200).json({
    carts: cartData[0],
    totalHarga: cartData[0].reduce((a, b) => a + parseFloat(b.Total_Harga), 0),
  });
};

// Controller untuk menghapus item dari keranjang
export const deleteCartItem = async (req, res) => {
  try {
    const deletecart = await ProductCart.findOne({
      where: {
        cartId: req.params.cartId,
      },
    });

    if (!deletecart) {
      return res.status(404).json({ msg: "No Data Found" });
    }

    const Deleteitem = await ProductCart.destroy({
      where: {
        cartId: req.params.cartId,
      },
    });

    if (Deleteitem) {
      return res.json({ msg: "Cart deleted successfully" });
    } else {
      return res.status(404).json({ msg: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteCartUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await ProductCart.destroy({
      where: {
        userId: userId,
      },
    });
    return res.json({ msg: "OK" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete cart items" });
  }
};
