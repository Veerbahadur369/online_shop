 
 export const  asyncHandler =  (requestHandler)=>{
       return (req,res,next )=>{
          
         Promise.resolve(requestHandler(req,res,next))
        .catch((error)=>{
            console.error("This in async handler",error)
            next()
        })
       
              
       }


 }