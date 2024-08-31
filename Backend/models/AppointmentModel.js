import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Appointment = db.define(
  "appointment",
  {
    Owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggalLahir: {
      type: DataTypes.DATE,
    },
    jenisKelamin: {
      type: DataTypes.STRING,
    },
    Spesies: {
      type: DataTypes.STRING,
    },
    Ras: {
      type: DataTypes.STRING,
    },
    typePengobatan: {
      type: DataTypes.STRING,
    },
    Schedule: {
      type: DataTypes.INTEGER,
      references: {
        model: "schedule", // Nama tabel kategori di database
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
export default Appointment;
