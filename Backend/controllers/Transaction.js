import { QueryTypes } from "sequelize";
import db from "../config/Database.js";
import { TransactionMaster } from "../models/TransactionModel.js";

export const CreateTransaksi = async (req,res) =>{
    const {userId} = req.body;
    
    const result = await db.query("Select c.userId,u.name,now(),'PENDING' From product_cart c inner join users u on c.userId=u.id where c.userId=:userId",{
        type: QueryTypes.SELECT,
        replacements: {userId:userId}
    });
    if (result.length < 1)
        return res.status(400).json({msg:"Cart tidak ditemukan"});
    const insertRes = await db.query("Insert into transaction_master(user_id,name,transaction_date,status) Select c.userId,u.name,now(),'PENDING' From product_cart c inner join users u on c.userId=u.id where c.userId=:userId order by c.cartId Asc limit 0,1",{
        type:QueryTypes.INSERT,
        replacements:{userId:userId}
    });
    const detailRes = await db.query("Insert into transaction_detail(transaction_id,product_id,qty) Select :transaction_id,c.productId,c.qty from product_cart c where c.userId=:userId",{
        type:QueryTypes.INSERT,
        replacements: {transaction_id:insertRes[0],userId:userId}
    });
    
    return res.json([result,insertRes,detailRes]);
}


export const UpdateTransaksi = async (req,res)=>{
    const {status} = req.body;
    const {id} = req.params;

    const transactionMaster = await TransactionMaster.findOne({
        where:{
            id: id,
            status: "PENDING"
        }
    });
    if (!transactionMaster)
        return res.status(404).json({msg:"Transaksi tidak ditemukan"});
    transactionMaster.setDataValue('status',status);
    const response = await transactionMaster.save();
    return res.json(response);
}

export const GetTransactionPending = async (req,res)=>{
    const transactions = await db.query("select t.id,t.name,p.name as productName,p.price,d.qty,t.status from transaction_master t inner join transaction_detail d on t.id=d.transaction_id left join users u on t.user_id=u.id inner join product p on d.product_id=p.id left join kategori k on p.kategori_id=k.id;")
}