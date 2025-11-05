import { Router } from "express";
import { getCurrentUserDetails, userLogin, userLogout, userRegister ,updateAvatar} from "../controllers/user.controllers.mjs";
import { verifyJwt } from "../middleware/verifyJwt.mjs";
import { upload } from "../middleware/multer.mjs";

const routes= Router()
 
routes.post('/userRegister',userRegister)
routes.post('/userLogin',userLogin)
routes.post("/userLogout",verifyJwt,userLogout)
routes.get('/getCurrentUserDetails',verifyJwt,getCurrentUserDetails)
routes.patch('/updateAvatarImage',verifyJwt,upload.single('avatar'),updateAvatar)
 
export {routes}
  