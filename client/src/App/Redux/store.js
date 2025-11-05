import { configureStore } from "@reduxjs/toolkit";
import loginReducer   from './slices/login.slice'
 
const storeData =  configureStore({
    reducer:{
    loginData:loginReducer,
}})

export {  storeData};