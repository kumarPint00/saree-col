const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { Image } = require("../models");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadFiles = multer({ storage, limits: { files: 10 } }).array(
  "images",
  10,
);

exports.upload = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    const images = [];
    for (const file of req.files) {
      const image = await Image.create({
        principalType: req.body.principalType,
        principalId: req.body.principalId,
        fileType: file.mimetype,
        originalName: file.originalname,
        size: file.size,
        url: `/images/${file.filename}`,
      });
      images.push(image);
    }
    res.status(201).json({ message: "Images uploaded successfully", images });
  } catch (error) {
    next(error);
  }
};

exports.findAllByPrincipalId = async (req, res, next) => {
  try {
    const { principalId } = req.params;
    const images = await Image.findAll({ where: { principalId } });
    res.json(images);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    const imagePath = path.join(
      __dirname,
      "..",
      "images",
      path.basename(image.url),
    );
    fs.unlinkSync(imagePath);
    await image.destroy();
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.uploadMiddleware = (req, res, next) => {
  uploadFiles(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "File upload error in middleware" });
    } else if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    
    next();
  });
};
