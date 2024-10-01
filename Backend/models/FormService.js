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
      allowNull: false,
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
        model: "kategori_service",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending", // Status default adalah 'pending'
    },
  },
  {
    freezeTableName: true,
  }
);

export default Form_Service;
