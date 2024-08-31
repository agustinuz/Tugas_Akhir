import Form_Service from "../models/FormService.js";
import Kategori_Service from "../models/KategoriService.js";

export const getService = async (req, res) => {
  try {
    const response = await Form_Service.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const CreateService = async (req, res) => {
  const {
    Name_Owner,
    Name_Animal,
    birthday_Animal,
    Jenis,
    RAS,
    Quantity,
    kategori_service,
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
    });
    res.status(201).json({ msg: "created successfully", newService });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const DeleteService = async (req, res) => {
  try {
    const service = await Form_Service.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (service) {
      res.json({ msg: "form service deleted successfully" });
    } else {
      res.status(404).json({ msg: "Form not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getKategoriService = async (req, res) => {
  try {
    const response = await Kategori_Service.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

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

    const kategoriDelete = await Kategori_Service.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (kategoriDelete) {
      return res.json({ msg: "Kategori deleted successfully" });
    } else {
      return res.status(404).json({ msg: "Kategori not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
