import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const TransactionMaster = db.define(
  "transaction_master",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    // Foreign key for Kategori
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users", // Nama tabel kategori di database
        key: "id", // Kolom id di tabel kategori
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    transaction_date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    updatedAt: false,
    createdAt: false,
  }
);

const TransactionDetail = db.define(
  "transaction_detail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "transaction_master",
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    qty: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);
export { TransactionMaster, TransactionDetail };
