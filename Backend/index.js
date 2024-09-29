import express from "express";
import db from "./config/Database.js";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routers/index.js";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("Database connected");
} catch (error) {
  console.error("error");
}

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.static("static"));
app.use(express.json());
app.use(router);
app.listen(5000, () => console.log("server running at port 5000"));
