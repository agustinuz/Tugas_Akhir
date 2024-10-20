import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Schedule = db.define(
  "schedule",
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false, 
    },
    antrian: {
      type: DataTypes.STRING,
    },
    service_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "form_service", // Nama tabel kategori di database
        key: "id", // Kolom id di tabel kategori
      },
      onUpdate: "CASCADE", // Jika ada perubahan pada id_kategori di tabel Kategori, perbarui juga di tabel Product
      onDelete: "CASCADE", 
    }
  },
  {
    freezeTableName: true,
    createdAt:false,
    updatedAt:false,
  }
);

export default Schedule;
