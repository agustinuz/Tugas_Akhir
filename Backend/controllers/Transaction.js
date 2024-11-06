import { QueryTypes } from "sequelize";
import db from "../config/Database.js";
import {
  TransactionMaster,
  TransactionDetail,
} from "../models/TransactionModel.js";
import Payment from "../models/payments.js";
import Product from "../models/productModel.js";

export const CreateTransaksi = async (req, res) => {
  const { userId } = req.body;

  const result = await db.query(
    "Select c.userId,u.name,now(),'PENDING' From product_cart c inner join users u on c.userId=u.id where c.userId=:userId",
    {
      type: QueryTypes.SELECT,
      replacements: { userId: userId },
    }
  );
  if (result.length < 1)
    return res.status(400).json({ msg: "Cart tidak ditemukan" });
  const insertRes = await db.query(
    "Insert into transaction_master(user_id,name,transaction_date,status) Select c.userId,u.name,now(),'PENDING' From product_cart c inner join users u on c.userId=u.id where c.userId=:userId order by c.cartId Asc limit 0,1",
    {
      type: QueryTypes.INSERT,
      replacements: { userId: userId },
    }
  );
  const detailRes = await db.query(
    "Insert into transaction_detail(transaction_id,product_id,qty) Select :transaction_id,c.productId,c.qty from product_cart c where c.userId=:userId",
    {
      type: QueryTypes.INSERT,
      replacements: { transaction_id: insertRes[0], userId: userId },
    }
  );

  return res.json([result, insertRes, detailRes]);
};

export const UpdateTransaksi = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    // Temukan transaksi master dengan ID yang diberikan dan status "PENDING"
    const transactionMaster = await TransactionMaster.findOne({
      where: {
        id: id,
        status: "PENDING",
      },
    });
    if (!transactionMaster) {
      return res.status(404).json({ msg: "Transaksi tidak ditemukan" });
    }

    // Update status transaksi master
    transactionMaster.setDataValue("status", status);
    await transactionMaster.save();

    // Hanya jika statusnya "TERKIRIM", lakukan pengurangan stok
    if (status === "Terkirim") {
      // Ambil semua transaksi detail berdasarkan transactionMasterId
      const transactionDetails = await TransactionDetail.findAll({
        where: { transaction_id: id }, // Pastikan ini sesuai dengan nama kolom yang benar
      });

      // Loop melalui setiap transaksi detail untuk mengurangi stok produk
      for (const detail of transactionDetails) {
        // Temukan produk berdasarkan product_id di transaction detail
        const product = await Product.findOne({
          where: { id: detail.product_id },
        });

        if (product) {
          // Kurangi stok berdasarkan qty
          product.stock = product.stock - detail.qty;

          // Pastikan stok tidak negatif
          if (product.stock < 0) {
            return res
              .status(400)
              .json({ msg: `Stok produk ${product.name} tidak cukup` });
          }

          // Simpan perubahan stok
          await product.save();
        }
      }
    }

    // Kembalikan response sukses
    return res
      .status(200)
      .json({ msg: "Status transaksi berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat memperbarui transaksi" });
  }
};

export const GetTransactionMaster = async (req, res) => {
  const { type } = req.params;
  const { userId } = req.query;
  if (type != "Admin" && type != "User") return res.status(200).json([]);
  let additionalQuery = "";
  let additionalParam = { type: QueryTypes.SELECT };
  if (type == "User") {
    additionalQuery = " where m.user_id=:userId ";
    additionalParam = {
      ...additionalParam,
      replacements: { userId: userId },
    };
  }
  const queryString = `select m.id as transaction_id,m.user_id,m.name,m.transaction_date,m.status,sum(p.price * d.qty) as subtotal,!isnull(py.id) as paid  from transaction_master m inner join transaction_detail d on m.id=d.transaction_id inner join product p on d.product_id=p.id left join payment py on m.id=py.transaction_id ${additionalQuery} Group by m.id`;
  const transactions = await db.query(queryString, additionalParam);
  return res.status(200).json(transactions.length < 1 ? [] : transactions);
};
export const GetTransactionDetail = async (req, res) => {
  const { transaction_id } = req.params;

  const queryString = `select d.transaction_id,d.id as transaction_detail_id,p.name as namaProduct,p.price as hargaProduct,d.qty,(p.price * d.qty) as totalHarga,p.image,p.url from transaction_detail d inner join product p on d.product_Id=p.id where d.transaction_id=:transaction_id`;
  const transactions = await db.query(queryString, {
    type: QueryTypes.SELECT,
    replacements: { transaction_id: transaction_id },
  });
  return res.status(200).json(transactions.length < 1 ? [] : transactions);
};

export const GetPayment = async (req, res) => {
  const { transaction_id } = req.params;
  const queryString = `select py.alamat,py.no_hp,py.url,py.image,py.id,py.transaction_id,m.name,m.status,sum(p.price * d.qty) as totalPembayaran from payment py inner join transaction_master m on py.transaction_id=m.id inner join transaction_detail d on m.id=d.transaction_id inner join product p on d.product_id=p.id where py.transaction_id=:transaction_id Group by m.id`;
  const payments = await db.query(queryString, {
    type: QueryTypes.SELECT,
    replacements: { transaction_id: transaction_id },
  });
  return res.status(200).json(payments.length < 1 ? [] : payments);
};

export const SubmitPayment = async (req, res) => {
  const { transaction_id, alamat, no_hp } = req.body;
  const checkTransactionExist = await TransactionMaster.count({
    where: {
      id: transaction_id,
    },
  });
  if (checkTransactionExist < 1)
    return res.status(404).json({ msg: "Transaction not found" });
  if (req.file == null) return res.status(400).json({ msg: "Files not found" });
  const file = req.file;
  const fileSize = 1;
  const ext = `.${file.mimetype.split("/")[1]}`;
  const fileName = file.filename;
  const url = `${req.protocol}://${req.get(
    "host"
  )}/uploads/imagePayment/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });
  try {
    const paymentResult = await Payment.create({
      transaction_id: transaction_id,
      image: fileName,
      url: url,
      alamat: alamat,
      no_hp: no_hp,
    });
    const res1 = await paymentResult.save();
    return res.json({ data: res1 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message || err });
  }
};

export const countUserTransactions = async (req, res) => {
  try {
    const { id } = req.params; // Get userId from request parameters

    // Count the number of transactions for the given user ID
    const count = await TransactionMaster.count({
      where: {
        id: id,
      },
    });

    // Return the count as a response
    res.status(200).json({
      success: true,
      count: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving transaction count",
      error: error.message,
    });
  }
};

export const deleteTransaksi = async (req, res) => {
  const { transaction_id } = req.params; // Memastikan transactionId berasal dari parameter request
  try {
    const deletedTransaction = await TransactionMaster.findOne({
      where: {
        id: transaction_id,
      },
    });

    if (!deletedTransaction) {
      return res.status(404).json({ msg: "No Data Found" });
    }

    // Menghapus transaksi jika ditemukan
    await TransactionMaster.destroy({
      where: {
        id: transaction_id,
      },
    });

    return res.json({ msg: "Transaksi deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
