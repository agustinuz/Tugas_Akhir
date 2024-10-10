import express from "express";
import db from "./config/Database.js";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routers/index.js";
import dotenv from "dotenv";
import Payment from "./models/payments..js";
// import { TransactionDetail } from "./models/TransactionModel.js";

dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("Database connected");
  await Payment.sync();
} catch (error) {
  console.error("Mysql Error Check your XAMPP");
}

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static("static"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(router);
app.listen(5000, () => console.log("server running at port 5000"));
