import { Router } from "express";
import { getAllProudcts, getDetailsOfProduct } from "../controllers/products.controllers.mjs";
 
import { verifyJwt } from "../middleware/verifyJwt.mjs";

const productRoutes = Router()

productRoutes.get('/getAllProudcts',verifyJwt ,getAllProudcts);
productRoutes.get('/getDetailsOfProduct/:_id',verifyJwt ,getDetailsOfProduct);



export {productRoutes};