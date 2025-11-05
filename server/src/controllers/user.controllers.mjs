import { deletImageOfCloudinary, uploadOnCloudinary } from "../config/cloudinary.mjs";
import { User } from "../models/users.models.mjs";
import { apiErrorHandling } from "../utils/apiErrorHandling.mjs";
import { apiResponse } from "../utils/apiResponse.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";

const generateAccessAndRefreshToken=async(userId)=>{
     try {
      const user= await User.findById(userId);
      
     const accessToken = await user.genrateAccesToken();
     const refreshToken = await user.genrateRefreshToken();
      return {accessToken,refreshToken};
     } catch (error) {
      console.log("Error while generating jwt tokens",error)
     }
}


const userRegister = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body
   console.log(name, password, email)

   if (!(name || email || password)) {
      throw new apiErrorHandling(400, "please send required data ")
   }

   const user = await User.findOne({ email })
   if (user) {
      throw new apiErrorHandling(400, "User exit ")

   }



   const userdata = await User.create(req.body)
   if (!userdata) {
      throw new apiErrorHandling(400, "Error in access data from User")
   }
   console.log(userdata);
   res.status(200).json(new apiResponse(200, "succeess full", req.body))

})

const userLogin = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   
   if (!(email || password)) {
      throw new apiErrorHandling(400, "Please fill required fields")
   }
   const user = await User.findOne({email});
    
   if (!user?._id) {
      throw new apiErrorHandling(400, "User not exist")
   }
   const passwordIsCorrect = await user.verifyUserPassword(password);
    
 
   if(!passwordIsCorrect){
       throw new apiErrorHandling(400, "Please Enter correct credentials");
   }

   const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);
  
  await user.updateOne({refreshToken}) ;
 const data =   await user.save() ;
  const sendData = await User.findById(user._id).select('-password ')
const options ={
   httpOnly:true,
   secure:true
}
   

   res.status(200)
   .set('authorization',accessToken)
   .cookie('accessToken',accessToken,options)
   .cookie('refreshToken',refreshToken,options)
   .json(new apiResponse(200,"Login Successfully",{ sendData,accessToken}))

})

const userLogout =asyncHandler(async (req,res) => {
   const userId =await req.user._id
  
      if(!userId){ 
        throw new apiErrorHandling(401,"you are not authorized")
      }
      const user = await User.findById(userId);
      await user.updateOne({refreshToken:""});
      const options ={
   httpOnly:true,
   secure:true
}
      res.status(200)
      .clearCookie('accessToken',options)
      .clearCookie('refreshToken',options)
      .json(new apiResponse(200,"Logout successfully",user.name))

   
})
 

const getCurrentUserDetails= asyncHandler(async (req,res) => {
   const userId  =await req.user._id;
    if(!userId){
      throw new apiErrorHandling(200,"Please login first")
    }
      const userDetails =await User.findById(userId).select('-password');
      res.status(200)
      .json(new apiResponse(200,"Getting details succesfully",userDetails))

})

const updateAvatar=asyncHandler(async (req,res) => {
   const localFilePath= req.file.path;
   const userId = req.user._id
   if(!userId){
     throw new apiErrorHandling(404,"Please login first")
   }
   const user= await User.findById(userId).select('-password');
    if(!user){
     throw new apiErrorHandling(404,"You are not autherized user")
   }

    const deleteRes = await deletImageOfCloudinary(user.avatar.public_id)
    console.log(deleteRes);
  const response= await  uploadOnCloudinary(localFilePath);
const imageUrl= response.url
const publicId= response.public_id
         await user.updateOne({ "avatar.url":imageUrl,
            "avatar.public_id":publicId

         })

       await  user.save();
      res.status(200)
      .json(new apiResponse(200,"Image update Successfully",user))
   
})


export { userRegister, userLogin ,userLogout,getCurrentUserDetails,updateAvatar}