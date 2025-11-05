import express from 'express'
import cookieParser from 'cookie-parser'
 import cors from 'cors'
import { routes } from './routes/userRoutes.mjs'
import { productRoutes } from './routes/products.routes.mjs'
import { aiAPI } from './routes/Ai.routes.mjs'
import { mailRoute } from './routes/mailRoute.mjs'
 

const app = express()
app.use(cors({
  path:"http://localhost:5173",
  credentials:true
}));
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({
  extended: true, 
  limit: "16kb"  
})) 
app.use(cookieParser())
 
app.get('/',(res,req)=>{
  res.json({
    message:"Welcome to our backend server",
    status:true
  })
})
app.use('/api/v1/user', routes);
app.use('/api/v1/proudct', productRoutes);
app.use('/api/v1/chatbot',aiAPI)
app.use('/api/v1/nodeMailer',mailRoute)

export { app };

