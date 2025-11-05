import { Router } from "express";
import { getAllProudcts, getDetailsOfProduct } from "../controllers/products.controllers.mjs";
 
import { verifyJwt } from "../middleware/verifyJwt.mjs";

const productRoutes = Router()

productRoutes.get('/getAllProudcts' ,getAllProudcts);
productRoutes.get('/getDetailsOfProduct/:_id' ,getDetailsOfProduct);



export {productRoutes};