import UserImages from "../models/imageUser.js";
import path from "path";
import fs from "fs";
import multer from "multer";

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/imageUser"); // Folder untuk menyimpan gambar
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename menggunakan timestamp
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size 1MB
}).single("image"); // Hanya satu file gambar

// Controller untuk mengunggah dan menyimpan gambar profil
export const uploadProfileImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    // Cek apakah file diupload
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const { userId } = req.body; // Dapatkan userId dari body request
    const image = req.file.filename; // Nama file
    const url = `${req.protocol}://${req.get(
      "host"
    )}/uploads/imageUser/${image}`; // URL file yang dapat diakses

    try {
      // Cari apakah user sudah punya foto profil
      const userImage = await UserImages.findOne({ where: { userId } });

      if (userImage) {
        // Jika sudah ada foto, hapus yang lama dan update dengan yang baru
        const oldImagePath = `uploads/imageUser/${userImage.image}`;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Hapus file lama
        }

        // Update gambar profil
        userImage.image = image;
        userImage.url = url;
        await userImage.save();

        return res.status(200).json({ msg: "Profile image updated", url });
      }

      // Jika belum ada, buat entri baru di tabel user_images
      await UserImages.create({ userId, image, url });
      res.status(201).json({ msg: "Profile image uploaded", url });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  });
};

// Controller untuk mendapatkan gambar profil user
export const getProfileImage = async (req, res) => {
  const { userId } = req.query; // Dapatkan userId dari query

  try {
    // Cari gambar profil berdasarkan userId
    const userImage = await UserImages.findOne({ where: { userId } });

    if (!userImage) {
      return res.status(404).json({ msg: "Profile image not found" });
    }

    res.status(200).json({ url: userImage.url });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
