import jwt from 'jsonwebtoken'

export const verifyJwt = async (req,res, next)=>{

    try {

 const token = await  req.cookies.accessToken ||  req.headers['authorization'].split(' ')[1]
 
 
    const decodedValue = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    req.user=decodedValue;
   
  return  next()  
        
    } catch (error) {
        console.error("Getting error while verify jwt tokens",error)
    }
}