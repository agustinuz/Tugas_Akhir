import { Sequelize } from "sequelize";

const db = new Sequelize("db_petshop", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
