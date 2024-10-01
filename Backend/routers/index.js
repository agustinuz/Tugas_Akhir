import express from "express";
import { getUsers, Register, Login, DeleteUser } from "../controllers/User.js";
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
  addCart,
  deleteCartItem,
  deleteCartUser,
  getCart,
} from "../controllers/Cart.js";
import { getImageById, saveImage } from "../controllers/UserImage.js";
import {
  CreateKategoriService,
  CreateService,
  deleteKategoriService,
  getKategoriService,
  getService,
} from "../controllers/Service_Controller.js";

const router = express.Router();

router.get("/getproducts", getProduct);
router.get("/getproducts/:id", getProductById);
router.get("/getKategori", getKategori);
router.get("/getUsers", getUsers);
router.get("/getAppointment", getAppointment);
router.get("/getSchedule", getSchedule);
router.get("/getservice", getService);
router.get("/kategoriService", getKategoriService);
router.post("/products", saveProduct);
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
router.patch("/products/:id", updateProduct);
router.post("/cart", addCart);
router.get("/cart/:userId", getCart);
router.delete("/cart/:userId", deleteCartUser);
router.delete("/cart/:cartId", deleteCartItem);
router.get("/profile-image/:userId", getImageById);
router.post("/upload-profile-image", saveImage);
export default router;
