import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';



const uploadOnCloudinary = async (localFilePth) => {
    try {
        if (!localFilePth) return null;
        const response = await cloudinary.uploader.upload(localFilePth, {
            resource_type: 'auto'
        })
        //file successfully uploaded! 
        console.log(`file Successfully uploaded! ${response.url}`)
        return response;
    } catch (error) {
        //remove the local storage saved tempraory file as the upload operation got failed
        fs.unlinkSync(localFilePth)
        return null;
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export {uploadOnCloudinary};