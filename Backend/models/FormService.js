import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Form_Service = db.define(
  "form_service",
  {
    Name_Owner: {
      type: DataTypes.STRING,
    },
    Name_Animal: {
      type: DataTypes.STRING,
    },
    birthday_Animal: {
      type: DataTypes.DATE,
      allowNull: false, // Set to false to disallow null values
    },
    Jenis: {
      type: DataTypes.STRING,
    },
    RAS: {
      type: DataTypes.STRING,
    },
    Quantity: {
      type: DataTypes.INTEGER,
    },
    kategori_service: {
      type: DataTypes.INTEGER,
      references: {
        model: "kategori_service", // Nama tabel kategori di database
        key: "id", // Kolom id di tabel kategori
      },
      onUpdate: "CASCADE", // Jika ada perubahan pada id_kategori di tabel Kategori, perbarui juga di tabel Product
      onDelete: "SET NULL", // Jika kategori dihapus, atur nilai kategori_id di produk menjadi NULL
    },
  },
  {
    freezeTableName: true,
  }
);

export default Form_Service;
