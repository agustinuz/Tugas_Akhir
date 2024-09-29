import UserImages from "../models/imageUser.js";
import fs from "fs";
import path from "path";

export const getImageById = async (req, res) => {
  try {
    const response = await UserImages.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveImage = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const { userId } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get(
    "host"
  )}./static/imageUser/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./static/imageUser/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await UserImages.create({
        userId: userId,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Images Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};
