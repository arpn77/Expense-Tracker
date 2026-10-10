import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import { ApiError } from './ApiError.js';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Validate input
        if (!localFilePath) {
            throw ApiError.badRequest("File path is required");
        }

        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            throw ApiError.badRequest("File not found");
        }

        // Upload to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            timeout: 60000
        });

        // Validate response
        if (!response?.url) {
            throw ApiError.serverError("Failed to upload file");
        }

        // Clean up local file
        fs.unlinkSync(localFilePath);
        
        return {
            url: response.url,
            public_id: response.public_id,
            size: response.bytes,
            format: response.format
        };

    } catch (error) {
        // Clean up local file if it exists
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        // Handle specific Cloudinary errors
        if (error.http_code) {
            switch (error.http_code) {
                case 400:
                    throw ApiError.badRequest("Invalid file format");
                case 401:
                    throw ApiError.unauthorized("Invalid Cloudinary credentials");
                case 413:
                    throw ApiError.badRequest("File size too large");
                default:
                    throw ApiError.serverError("Cloud storage error: " + error.message);
            }
        }

        // Re-throw API errors
        if (error instanceof ApiError) {
            throw error;
        }

        // Handle all other errors
        throw ApiError.serverError("File upload failed: " + error.message);
    }
};

export { uploadOnCloudinary };
