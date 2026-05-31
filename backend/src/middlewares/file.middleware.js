const multer = require("multer");

const storage = multer.memoryStorage();

const uploadImage = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },

    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg",
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {

            const error = new Error(
                "Only JPG, PNG, WEBP images allowed"
            );

            error.statusCode = 400;

            cb(error, false);
        }
    },
});

const uploadSingleImage = (fieldName) => {

    return (req, res, next) => {

        const upload = uploadImage.single(fieldName);

        upload(req, res, function (err) {

            if (err instanceof multer.MulterError) {

                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({
                        success: false,
                        message: "File size should be less than 5MB",
                    });
                }

                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }

            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
            }

            next();
        });
    };
};

module.exports = uploadSingleImage;