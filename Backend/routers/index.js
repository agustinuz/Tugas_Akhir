import express from "express";
import { getUsers, Register, Login, DeleteUser } from "../controllers/User.js";
import multer from "multer";
import path from "path";
// import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createSchedule,
  getSchedule,
  deleteSchedule,
  updateSchedule,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from "../controllers/Appointment.js";
import {
  getProduct,
  getProductById,
  saveProduct,
  deleteProduct,
  updateProduct,
  getKategori,
  createKategori,
  deleteKategori,
  updateKategori,
} from "../controllers/Product.js";
import {
  CreateKategoriService,
  CreateService,
  deleteKategoriService,
  getKategoriService,
  getService,
  getServiceByUser,
} from "../controllers/Service_Controller.js";
import {
  addCart,
  deleteCartUser,
  getCart,
  removeCart,
} from "../controllers/Cart.js";
// import {
//   getProfileImage,
//   uploadProfileImage,
// } from "../controllers/UserImage.js";
import {
  CreateTransaksi,
  GetPayment,
  GetTransactionDetail,
  GetTransactionMaster,
  UpdateTransaksi,
} from "../controllers/Transaction.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/imageProduct"); // Direktori penyimpanan file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama unik file
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/getproducts", getProduct);
router.get("/getproducts/:id", getProductById);
router.get("/getKategori", getKategori);
router.get("/getUsers", getUsers);
router.get("/getAppointment", getAppointment);
router.get("/getSchedule", getSchedule);
router.get("/getservice/:kategoriId", getService);
router.get("/getservice/:userId", getServiceByUser);
router.get("/kategoriService", getKategoriService);
router.post("/products", upload.single("file"), saveProduct); // Rute produk dengan upload fil
router.post("/createSchedule", createSchedule);
router.post("/createService", CreateService);
router.post("/createKategori", createKategori);
router.post("/kategoriService", CreateKategoriService);
router.post("/users", Register);
router.post("/createAppointment", createAppointment);
router.post("/login", Login);
router.delete("/deleteuser/:id", DeleteUser);
router.delete("/products/:id", deleteProduct);
router.delete("/deleteKategori", deleteKategori);
router.delete("/deleteAppointment", deleteAppointment);
router.delete("/deleteSchedule", deleteSchedule);
router.delete("/kategoriService/:id", deleteKategoriService);
router.put("/updateKategori/:id", updateKategori);
router.put("/updateAppointment", updateAppointment);
router.put("/updateSchedule", updateSchedule);
router.put("/products/:id", upload.single("file"), updateProduct);
router.post("/cart", addCart);
router.get("/cart/:userId", getCart);
router.delete("/cart/:userId", deleteCartUser);
router.delete("/cart/:cartId", removeCart);
router.post("/transaksi", CreateTransaksi);
router.put("/transaksi/:id", UpdateTransaksi);
router.get("/transaksi/:type", GetTransactionMaster);
router.get("/transaksi-detail/:transaction_id", GetTransactionDetail);
router.get("/transaksi-payment/:transaction_id", GetPayment);
router.post("/transaksi-payment", SubmitPayment);
export default router;
