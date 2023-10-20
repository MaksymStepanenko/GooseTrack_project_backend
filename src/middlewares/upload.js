import multer from "multer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatars',
        allowed_formats: ['jpg', 'png'],
        public_id: (req, file) => () => {
            const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
            const filename = `${uniquePreffix}_${file.originalname}`;
            return filename;
        },
    },
});

const upload = multer({ storage: storage });

export default upload; 