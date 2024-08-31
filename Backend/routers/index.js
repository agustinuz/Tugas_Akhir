import express from "express";
import { getUsers, Register, Login } from "../controllers/User.js";
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
} from "../controllers/Service_Controller.js";

const router = express.Router();

router.get("/getproducts", getProduct);
router.get("/products/:id", getProductById);
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
router.delete("/products/:id", deleteProduct);
router.delete("/deleteKategori", deleteKategori);
router.delete("/deleteAppointment", deleteAppointment);
router.delete("/deleteSchedule", deleteSchedule);
router.delete("/kategoriService/:id", deleteKategoriService);
router.put("/updateKategori", updateKategori);
router.put("/updateAppointment", updateAppointment);
router.put("/updateSchedule", updateSchedule);
router.patch("/products/:id", updateProduct);
export default router;
