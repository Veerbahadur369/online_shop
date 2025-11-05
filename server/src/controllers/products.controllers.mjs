import { Product } from "../models/products.model.mjs";
import { User } from "../models/users.models.mjs";
import { apiErrorHandling } from "../utils/apiErrorHandling.mjs";
import { apiResponse } from "../utils/apiResponse.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";


const getAllProudcts = asyncHandler(async (req,res) => {
  const productData = await  Product.find();
  if(!productData){
throw new apiErrorHandling(500,"Proudcts are not availabe")
  }

  res.status(200)
  .json(new apiResponse(200,"Product list ", productData));
      
})



const getDetailsOfProduct =asyncHandler(async (req,res) => {
    const productId= req.params._id 
    console.log(productId)
    if(!productId){
      throw new apiResponse(404,"Please Select  product")
    }

    const product=  await Product.findById(productId)
  
    if(!product._id){
              throw new apiResponse(404,"This product don't exist")

    }
    res.status(200) 
    .json(new apiResponse(200,"Successfully product detail gotted",product))
})

  


export {getAllProudcts,getDetailsOfProduct};