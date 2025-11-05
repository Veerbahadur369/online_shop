import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector,   } from 'react-redux';
import { getUserData, isAuthenticated } from '../Redux/slices/login.slice';
import { baseUrl } from '../shareUrl';

const Login = () => {
  const navigate = useNavigate();
  const [loginStatus,setLoginStatus] = useState(false);

  const { register:reg, handleSubmit, reset, formState: { errors } } = useForm();
 const dispatch = useDispatch()
 const states= useSelector(state=>state.loginData);
 console.log(states )
 
const onSubmit=async (data)=>{
 
    await  axios.post(`http://localhost:4000/api/v1/user/userLogin`,data)
      .then(res=>{
   
        if(res.status===200){
           dispatch(getUserData(res.data.data))
           dispatch(isAuthenticated(true))
           toast.success("Login Successful",{theme:'colored',autoClose:1000})
         setTimeout(()=>{

            navigate('/')
         },2000)
         setLoginStatus(true)
        }
       
      })
      .catch(
        (error)=>{
        return  console.error('Error while  login',error)
        }
        
      )
  
}
      
  return (
    <div className="min-h-screen bg-gradient-to-bt from-amber-100 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {loginStatus === 'success' && (
          <div className="bg-green-100 text-green-800 text-sm p-3 rounded mb-4 text-center">
            ✅ Login successful!
          </div>
        )}

        {loginStatus === 'error' && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4 text-center">
            ❌ Invalid email or password
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ToastContainer/>
          {/* Email Field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...reg('email', {
                required: 'Email is required',
              minLength:12,
              })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
            {errors.email?.type==='minLength' && <span className='text-red-600 text-sm'>Min lenght 12 required</span> }
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...reg('password', { required: 'Password is required' })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
            />
            {errors.pass && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-600 hover:underline">
              Sign up
            </Link></p>
          <p className="text-center text-sm text-gray-600 mt-4">
            <Link to="/forgot" className="text-amber-600 hover:underline"> 
              Forgot Password?
            </Link> </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
