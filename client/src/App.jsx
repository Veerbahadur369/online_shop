import {Route,Routes } from "react-router-dom";
import LandingPage from "./App/Pages/LandingPage";
import Register from "./App/Pages/Register";
import Login from "./App/Pages/Login";
import Welcomepage from "./App/Pages/Welcomepage";
import MainLayout from "./App/components/layout/MainLayout";
import ProfilePage from "./App/components/Profile/ProfilePage";
import Product from "./App/Pages/Product";
import About from "./App/Pages/About";
import ContactUs from "./App/Pages/ContactUs";
import ProductDetailsPage from "./App/Pages/ProductDetailsPage";
import ProtectedRoute from "./App/components/common/ProtectedRoute";
import BlogPage from "./App/Pages/BlogPage";
import ErrorPage from "./App/Pages/ErrorPage";
 



function App() {
  return(
 
  <Routes>
  
    <Route path="/register" element={ <Register/>}/>
    <Route path="/login" element={ <Login/>}/>
    <Route path="/" element={ <MainLayout/>}>
    <Route path="/" element={ <Welcomepage/>}/>
    <Route path="/profile" element={ <ProfilePage/>}/>
    <Route path="/shop" element={<ProtectedRoute>
      <Product/>
    </ProtectedRoute>}/>
    <Route path="/shop/details/:_id" element={<ProductDetailsPage/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/blog" element={<BlogPage/>}/>
    <Route path="/contact" element={<ContactUs/>}/>
     <Route path="*" element={<ErrorPage/>}/>
    </Route>
         <Route path="*" element={<ErrorPage/> } />
  </Routes>
 
  )
   

}

export default App;
