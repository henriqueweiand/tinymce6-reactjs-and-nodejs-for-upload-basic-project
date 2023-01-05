const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/upload/image", upload.single("file"), (req, res) => {
  console.log("Arquivo enviado com sucesso");

  const imagePath = "uploads/" + req.file.filename.replace(/\\/g, path.sep);

  res.json({
    location: `http://localhost:80/${imagePath}`,
    url: `http://localhost:80/${imagePath}`,
  });
});

app.listen(80, () => {
  console.log("Servidor rodando na porta 80");
});
