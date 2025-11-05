import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

 
 function ProtectedRoute(props) {
  const authenticated = useSelector(state =>state.loginData).isAuthenticated
  console.log(authenticated)
     const navigate = useNavigate()
     useEffect(() => {
        if(!authenticated)  navigate('/login')
        
       
     }, [authenticated]);

   return  authenticated? <>{props.children}</>:null
 }    
 
 export default ProtectedRoute
 