import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define(
  "product",
  {
    name: {
      type: DataTypes.STRING,
    },
    // Foreign key for Kategori
    kategori_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "kategori", // Nama tabel kategori di database
        key: "id", // Kolom id di tabel kategori
      },
      onUpdate: "CASCADE", // Jika ada perubahan pada id_kategori di tabel Kategori, perbarui juga di tabel Product
      onDelete: "SET NULL", // Jika kategori dihapus, atur nilai kategori_id di produk menjadi NULL
    },
    price: {
      type: DataTypes.DECIMAL(20, 2),
    },
    // // Foreign key for Merek
    // merk_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "merk", // Nama tabel merek di database
    //     key: "id", // Kolom id di tabel merek
    //   },
    //   onUpdate: "CASCADE", // Jika ada perubahan pada id_merek di tabel Merek, perbarui juga di tabel Product
    //   onDelete: "SET NULL", // Jika merek dihapus, atur nilai merek_id di produk menjadi NULL
    // },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Set a default stock value (can be adjusted)
    },
    description: {
      type: DataTypes.TEXT("medium"),
    },
    image: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Product;
