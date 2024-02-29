
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink); // Promisify the fs.unlink function for use with async/await

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImageToCloudinary = async (localFilePath ) => {
    try {
        if (!localFilePath) throw new Error('No file path specified.');
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type: 'image'});
        await unlinkAsync(localFilePath);
        return response;

    } catch (error) {
        try {
            await unlinkAsync(localFilePath);
        } catch (unlinkError) {
            console.error('An error occurred while trying to delete the local file:', unlinkError.message);
        }
        throw new Error(`Failed to upload file to Cloudinary: ${error.message || error}`);
    }
};

const uploadVideoToCloudinary = async (localFilePath ) => {
    try {
        if (!localFilePath) throw new Error('No file path specified.');
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:'video'});
        await unlinkAsync(localFilePath);
        return response;

    } catch (error) {
        try {
            await unlinkAsync(localFilePath);
        } catch (unlinkError) {
            console.error('An error occurred while trying to delete the local file:', unlinkError.message);
        }
        throw new Error(`Failed to upload file to Cloudinary: ${error.message || error}`);
    }
};


const deleteCloudinaryImage = async (imageUrl) => {
    try {
        if (!imageUrl) return null;
        const splittedUrl = imageUrl.split("/");
        const publicId = splittedUrl[splittedUrl.length - 1].split(".")[0];
        const deletedImage = await cloudinary.uploader.destroy(publicId);
        return deletedImage;
    } catch (error) {
        return null;
    }
}


module.exports = {
    uploadImageToCloudinary,
    uploadVideoToCloudinary,
    deleteCloudinaryImage
}