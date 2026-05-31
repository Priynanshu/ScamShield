const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadImageToImageKit = async (file) => {

    try {

        const response = await imagekit.upload({
            file: file.buffer,
            fileName: `img-${Date.now()}`,
            folder: "/scamDetect",
        });

        return response.url;

    } catch (error) {

        console.log("Image upload error:", error);

        throw new Error("Image upload failed");
    }
};

module.exports = uploadImageToImageKit;