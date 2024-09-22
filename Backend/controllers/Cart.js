import db from "../config/Database.js";
import ProductCart from "../models/productCart.js";
import Product from "../models/productModel.js";
import Users from "../models/userModels.js";



export const addCart = async (req,res)=>{
    const {userId,productId,qty} = req.body;
    const checkProduct = await Product.count({
        where: {
            id: productId
        }
    });
    if (checkProduct< 1)
        return res.status(404).json({msg:'Product Not Found'});
    const checkUser = await Users.count({
        where: {
            id: userId
        }
    });
    if (checkUser < 1)
        return res.status(404).json({msg: 'User Not Found'});
    const checkCart = await ProductCart.findOne({
        where:{
            productId: productId,
            userId: userId
        }
    });
    if (checkCart)
    {
        checkCart.setDataValue('qty',parseFloat(checkCart.dataValues.qty) + qty );
        await checkCart.save();
    }
    else
    {
        const newCartProduct = {
            userId: userId,
            productId: productId,
            qty: qty
        };
        const newState =  await ProductCart.create(newCartProduct);
        await newState.save();
    }
    return res.status(200).json({msg:"OK"});
}

export const getCart = async (req,res) =>{
    const {userId} = req.params;
    
    const checkUser = await Users.count({
        where: {
            id: userId
        }
    });
    if (checkUser < 1)
        return res.status(404).json({msg: 'User Not Found'});
    const cartData = await db.query(`
    select c.cartId,c.productId,c.userId,p.name as 'ProductName',k.nameKategori as 'Kategori',p.price,c.qty,p.price * c.qty as 'Total_Harga' from product_cart c inner join product p on c.productId=p.id left join kategori k on p.kategori_id=k.id
    where c.userId='${userId}';
    `);
    
    return res.status(200).json({carts: cartData[0],totalHarga: cartData[0].reduce((a,b)=> a+parseFloat(b.Total_Harga),0)});
}

export const deleteCartUser = async (req,req )=>{
    const {userId} = req.params;

    await ProductCart.destroy({
        where: 
        {
            userId:userId
        }
    });
    return res.json({msg:"OK"});
}

export const removeCart = async (req,res)=>{
    const {cartId } = req.params;
    const {qty} = req.qty;

    const cart =await ProductCart.findOne({
        where:{
            cartId: cartId
        }
    });
    if (!cart)
        return res.status(404).json({msg:'Cart Not Found'});
    if ((cart.dataValues.qty  - qty) < 1)
    {
        await ProductCart.destroy({
            where:{
                cartId: cartId
            }
        });
    }
    else
    {
        cart.setDataValue('qty',cart.dataValues.qty - qty);
        await cart.save();
    }
    return res.status(200).json({msg: 'OK'})
}