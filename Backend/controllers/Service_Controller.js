import Form_Service from "../models/FormService.js";
import Kategori_Service from "../models/KategoriService.js";
import db from "../config/Database.js";

// Ambil semua form service
// export const getService = async (req, res) => {
//   try {
//     const response = await Form_Service.findAll();
//     res.json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
export const getService = async (req, res) => {
  const { kategoriId } = req.params;

  const checkKategori = await Kategori_Service.count({
    where: {
      id: kategoriId,
    },
  });
  if (checkKategori < 1)
    return res.status(404).json({ msg: "Kategori Not Found" });
  const serviceData = await db.query(`
     select fs.id AS 'ServiceId',fs.Name_Owner,fs.Name_Animal,fs.birthday_Animal,fs.Jenis,fs.RAS,fs.Quantity,k.nameKategori AS 'kategori_service',fs.status from form_service fs inner join kategori_service k ON fs.kategori_service = k.id`);
  return res.status(200).json({
    services: serviceData[0],
  });
};

// Buat form service baru, userId diambil dari frontend
export const CreateService = async (req, res) => {
  const {
    Name_Owner,
    Name_Animal,
    birthday_Animal,
    Jenis,
    RAS,
    Quantity,
    kategori_service,
    userId, // Ambil userId dari request body (frontend akan menyertakan ini)
  } = req.body;

  try {
    const newService = await Form_Service.create({
      Name_Owner: Name_Owner,
      Name_Animal: Name_Animal,
      birthday_Animal: birthday_Animal,
      Jenis: Jenis,
      RAS: RAS,
      Quantity: Quantity,
      kategori_service: kategori_service,
      userId: userId, // Set userId yang diterima dari frontend
      status: "pending", // Set status menjadi 'pending'
    });
    res.status(201).json({ msg: "created successfully", newService });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Hapus form service
export const DeleteService = async (req, res) => {
  try {
    const service = await Form_Service.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!service) {
      return res.status(404).json({ msg: "Form not found" });
    }

    await Form_Service.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ msg: "Form service deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Ambil kategori service
export const getKategoriService = async (req, res) => {
  try {
    const response = await Kategori_Service.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

// Buat kategori service baru
export const CreateKategoriService = async (req, res) => {
  const { nameKategori } = req.body;
  try {
    const newKategori = await Kategori_Service.create({
      nameKategori: nameKategori,
    });
    res.status(201).json({ msg: "created successfully", newKategori });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Hapus kategori service
export const deleteKategoriService = async (req, res) => {
  try {
    const kategoriService = await Kategori_Service.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kategoriService) {
      return res.status(404).json({ msg: "No Data Found" });
    }

    await Kategori_Service.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ msg: "Kategori deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Admin mengubah status form service
export const updateServiceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'disetujui' atau status lain

  try {
    const service = await Form_Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ msg: "Service form not found" });
    }

    service.status = status; // Ubah status form
    await service.save();

    res.json({ msg: "Service status updated", service });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
