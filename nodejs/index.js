const express = require("express");
const multer = require("multer");
const path = require("path");
const os = require("os");

const hostname = os.hostname();
const port = process.env.PORT || 80;

const app = express();
const reactBuildDir = "reactjs/build";
const uploadDir = "uploads";

app.use("/" + uploadDir, express.static(uploadDir));
app.use(express.static(path.join(__dirname, "../" + reactBuildDir)));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir + "/");
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

app.get("*", (req, res) => {
  console.log("ReactJS project running");

  res.sendFile(path.join(__dirname + "/reactjs/build/index.html"));
});

app.post("/upload/image", upload.single("file"), (req, res) => {
  console.log("Arquivo enviado com sucesso");

  const imagePath =
    uploadDir + "/" + req.file.filename.replace(/\\/g, path.sep);

  const response = `/${imagePath}`; // IF you're running from CRA please add full route here http://localhost:${port}/${imagePath}

  res.json({
    location: response,
    url: response,
  });
});

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
