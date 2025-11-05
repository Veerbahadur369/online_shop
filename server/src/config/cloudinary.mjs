import {v2 as cloudinary}  from 'cloudinary'
import fs from 'fs'

 cloudinary.config({ 
        cloud_name: 'daz8687a7',
        api_key:'917477121942561', 
        api_secret:'UgzvU2Qr5XUfpukmVJ3qc9gTXis'
       

        
    });


 

   const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
       

        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;
 
    } catch (error) {
        // remove the locally saved temporary file as the upload operation got failed
         console.log(error)
    }
}
  
const deletImageOfCloudinary = async (publicId) => {
    try {
    const response=    await  cloudinary.uploader.destroy(publicId) 
    return response;
    } catch (error) {
        console.error("Error while deleting image with cloudinary ",error)
    }
    
}

 
export {  uploadOnCloudinary,deletImageOfCloudinary} 