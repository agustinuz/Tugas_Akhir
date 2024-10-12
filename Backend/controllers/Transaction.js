import { QueryTypes } from "sequelize";
import db from "../config/Database.js";
import { TransactionMaster } from "../models/TransactionModel.js";
import Payment from "../models/payments.js";

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

  const transactionMaster = await TransactionMaster.findOne({
    where: {
      id: id,
      status: "PENDING",
    },
  });
  if (!transactionMaster)
    return res.status(404).json({ msg: "Transaksi tidak ditemukan" });
  transactionMaster.setDataValue("status", status);
  const response = await transactionMaster.save();
  return res.json(response);
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


export const SubmitPayment = async (req,res)=>{
  const {transaction_id,alamat,no_hp} = req.body;
  const checkTransactionExist = await TransactionMaster.count({
    where:{
      id:  transaction_id
    }
  });
  if (checkTransactionExist < 1)
    return res.status(404).json({msg:"Transaction not found"});
  if (req.files == null)
    return res.status(400).json({msg: "Files not found"});
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get(
      "host"
    )}./static/imagePayment/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
  
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
  file.mv(`./static/imagePayment/${fileName}`, async (err)=>{
    return res.status(500).json({msg:JSON.stringify(err)});
  });
  const paymentResult = await Payment.create({
    transaction_id: transaction_id,
    image:fileName,
    url:url,
    alamat:alamat,
    no_hp:no_hp
  });
  const res = await paymentResult.save();
  return res.json({data:res});
}