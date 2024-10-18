import Product from "../models/productModel.js";
import Kategori from "../models/kategoriProduct.js";
// import Merk from "../models/merkProduct.js";
// import { uploadSingle } from "../middleware/ImageUpload.js";
import fs from "fs";
import path from "path";

// //PRODUCT
// // Get all products
export const getProduct = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveProduct = async (req, res) => {
  const { name, kategori_id, price, stock, description } = req.body;
  const file = req.file;

  // Validasi jika file ada
  if (!file) return res.status(400).json({ msg: "No File Uploaded" });

  const fileSize = file.size;
  const ext = path.extname(file.originalname);
  const fileName = file.filename; // Nama file dari multer
  const url = `${req.protocol}://${req.get(
    "host"
  )}/uploads/imageProduct/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  // Validasi ekstensi file
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Image Type" });

  // Validasi ukuran file
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  try {
    await Product.create({
      name,
      kategori_id,
      price,
      stock,
      description,
      image: fileName,
      url,
    });
    res.status(201).json({ msg: "Product Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
    });
    if (!product) return res.status(404).json({ msg: "No Product Found" });

    let fileName = product.image;
    if (req.file) {
      const file = req.file;
      const fileSize = file.size;
      const ext = path.extname(file.originalname);
      fileName = file.filename;
      const allowedType = [".png", ".jpg", ".jpeg"];

      // Validasi ekstensi file
      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Image Type" });

      // Validasi ukuran file
      if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5 MB" });

      // Hapus file lama
      const oldFilePath = `./uploads/imageProduct/${product.image}`;
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    const { name, kategori_id, price, stock, description } = req.body;
    const url = `${req.protocol}://${req.get(
      "host"
    )}/uploads/imageProduct/${fileName}`;

    await Product.update(
      {
        name,
        kategori_id,
        price,
        stock,
        description,
        image: fileName,
        url,
      },
      { where: { id: req.params.id } }
    );

    res.status(200).json({ msg: "Product Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./uploads/imageProduct/${product.image}`;
    fs.unlinkSync(filepath);
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
// // Create a new product
// export const createProduct = async (req, res) => {
//   const { name, kategori_id, merk_id, stock, price, description } = req.body;

//   uploadSingle(req, res, async (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(400).json({ msg: err.message });
//     }
//     try {
//       // Add validation for each field (name, category, etc.)
//       const validationErrors = [];
//       // Example validation logic
//       if (!name) validationErrors.push("Name is required");
//       if (!kategori_id) validationErrors.push("Kategori ID is required");
//       if (!merk_id) validationErrors.push("Merk ID is required");
//       if (!stock) validationErrors.push("Stock is required");
//       if (!price) validationErrors.push("Price is required");
//       if (!description) validationErrors.push("Description is required");

//       if (validationErrors.length > 0) {
//         return res
//           .status(400)
//           .json({ msg: "Validation errors", errors: validationErrors });
//       }

//       const newProduct = await Product.create({
//         name,
//         kategori_id,
//         merk_id,
//         stock,
//         price,
//         description,
//         image: req.file ? req.file.filename : "",
//       });

//       res.status(201).json({ msg: "Product created successfully", newProduct });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ msg: "Internal Server Error" });
//     }
//   });
// };

// // Delete a product by ID
// export const deleteProduct = async (req, res) => {
//   const { id } = req.body;
//   try {
//     const deletedProduct = await Product.destroy({
//       where: {
//         id: id,
//       },
//     });
//     if (deletedProduct > 0) {
//       res.json({ msg: "Product deleted successfully" });
//     } else {
//       res.status(404).json({ msg: "Product not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

// // Update a product by ID
// export const updateProduct = async (req, res) => {
//   const { id, name, kategori_id, merk_id, stock, price, description } =
//     req.body;

//   try {
//     const product = await Product.findOne({ where: { id } });
//     if (!product) {
//       return res.status(404).json({ msg: "Product not found" });
//     }

//     // Use the multer middleware to handle file upload
//     uploadSingle(req, res, async (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(400).json({ msg: err.message });
//       }

//       // Handle photo update (optional)
//       if (req.file) {
//         // Delete existing photo file if needed
//         if (product.image) {
//           const oldImagePath = path.join(
//             __dirname,
//             "../uploads",
//             product.image
//           );
//           fs.unlink(oldImagePath, (err) => {
//             if (err) console.error("Error deleting old Image:", err);
//           });
//         }
//         product.image = req.file.filename;
//       }

//       // Update other product details
//       product.name = name;
//       product.kategori_id = kategori_id;
//       product.merk_id = merk_id;
//       product.stock = stock; // Update stock
//       product.price = price;
//       product.description = description;

//       await product.save();

//       res.json({ msg: "Product updated successfully", product });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error updating product" });
//   }
// };

// export const adjustStock = async (req, res) => {
//   const { id, stockChange } = req.body;

//   try {
//     const product = await Product.findOne({ where: { id } });
//     if (!product) {
//       return res.status(404).json({ msg: "Product not found" });
//     }

//     product.stock += stockChange; // Adjust stock

//     await product.save();

//     res.json({ msg: "Stock adjusted successfully", product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error adjusting stock" });
//   }
// };

// // MERK PRODUCT
// // Get all merek
// export const getMerk = async (req, res) => {
//   try {
//     const merk = await Merk.findAll();
//     res.json(merk);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// };
// // Create a new merek
// export const createMerk = async (req, res) => {
//   const { nameMerk } = req.body;
//   try {
//     const newMerk = await Merk.create({
//       nameMerk: nameMerk,
//     });
//     res.status(201).json({ msg: "Merek created successfully", newMerk });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// };
// // Delete a merek by ID
// export const deleteMerk = async (req, res) => {
//   const { nameMerk } = req.body;
//   try {
//     const deletedMerk = await Merk.destroy({
//       where: {
//         nameMerk: nameMerk,
//       },
//     });
//     if (!deletedMerk) {
//       res.json({ msg: "Merk deleted successfully" });
//     } else {
//       res.status(404).json({ msg: "Merk not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

// // Update a merek by ID
// export const updateMerk = async (req, res) => {
//   const { nameMerk, newNameMerk } = req.body;
//   try {
//     const updatedMerk = await Merk.update(
//       {
//         nameMerk: newNameMerk,
//       },
//       {
//         where: {
//           nameMerk: nameMerk,
//         },
//       }
//     );
//     if (updatedMerk[0] !== 0) {
//       res.json({ msg: "Merek updated successfully" });
//     } else {
//       res.status(404).json({ msg: "Merek not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

// KATEGORI PRODUCT
// Get all kategori

export const getKategori = async (req, res) => {
  try {
    const kategoris = await Kategori.findAll();
    res.json(kategoris);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// Create a new kategori
export const createKategori = async (req, res) => {
  const { nameKategori, Description } = req.body;
  try {
    const newKategori = await Kategori.create({
      nameKategori: nameKategori,
      Description: Description,
    });
    res.status(201).json({ msg: "Kategori created successfully", newKategori });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// Delete a kategori by nameKategori
export const deleteKategori = async (req, res) => {
  const { nameKategori } = req.body;
  try {
    const deletedKategori = await Kategori.destroy({
      where: {
        nameKategori: nameKategori,
      },
    });
    if (deletedKategori) {
      res.json({ msg: "Kategori deleted successfully" });
    } else {
      res.status(404).json({ msg: "Kategori not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update a kategori by nameKategori
// Update a kategori by nameKategori
export const updateKategori = async (req, res) => {
  const { newNameKategori, newDescription } = req.body; // Data baru dari body request

  try {
    // Cari kategori berdasarkan id
    const kategori = await Kategori.findOne({
      where: {
        id: req.params.id,
      },
    });

    // Jika kategori ditemukan, lakukan update
    if (kategori) {
      kategori.nameKategori = newNameKategori || kategori.nameKategori;
      kategori.Description = newDescription || kategori.Description;

      await kategori.save(); // Simpan perubahan

      res.json({
        msg: "Kategori updated successfully",
        updatedKategori: kategori,
      });
    } else {
      res.status(404).json({ msg: "Kategori not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
