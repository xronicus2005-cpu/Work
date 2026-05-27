import multer from "multer";
import path from "path";
import fs from "fs";

// ensure folder exists
const uploadPath = "uploads/avatars";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `user-${Date.now()}${ext}`;
        cb(null, uniqueName);
    }
});

export const uploadAvatar = multer({ storage });