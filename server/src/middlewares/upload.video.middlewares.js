import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./public",
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const uniqueFilename = `${file.fieldname}_${timestamp}_${randomString}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const uploadVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024, files: 10 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "video/mp4",
      "video/quicktime",
      "video/x-matroska",
      "video/webm",
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(new Error("Only video files are allowed!"));
    } else {
      cb(null, true);
    }
  },
});

export default uploadVideo;
