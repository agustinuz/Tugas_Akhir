import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Payment = db.define(
  "payment",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "transaction_master", // Nama tabel kategori di database
        key: "id", // Kolom id di tabel kategori
      },
      onUpdate: "CASCADE", // Jika ada perubahan pada id_kategori di tabel Kategori, perbarui juga di tabel Product
      onDelete: "CASCADE",
    },
    image: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.STRING,
    },
    no_hp: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

export default Payment;
