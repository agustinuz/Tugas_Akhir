import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const ProductCart = db.define(
  "product_cart",
  {
    cartId: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    // Foreign key for Kategori
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "product", // Nama tabel kategori di database
        key: "id", // Kolom id di tabel kategori
      },
      onUpdate: "CASCADE", // Jika ada perubahan pada id_kategori di tabel Kategori, perbarui juga di tabel Product
      onDelete: "CASCADE", // Jika kategori dihapus, atur nilai kategori_id di produk menjadi NULL
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: "id"
        }
    },
    qty: {
      type: DataTypes.DECIMAL(18,3),
    }
  },
  {
    freezeTableName: true,
    updatedAt: false,
    createdAt: false
  }
);

export default ProductCart;
