import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const uploadHeroImages = multer({
  storage,
  fileFilter,
}).fields([
  { name: "firstImageURL", maxCount: 1 },
  { name: "secondImageURL", maxCount: 1 },
]);

export default uploadHeroImages;
