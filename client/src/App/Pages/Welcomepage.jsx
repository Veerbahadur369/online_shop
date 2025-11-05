import {  useState } from 'react';
 

 
import { Link } from "react-router-dom";
import Mywelcom from '../MyWeclom';
import Loader from '../components/common/Loader';
 
const Welcomepage = () => {
  const [loading, setLoading] = useState(true);
 setTimeout(() => {
    setLoading(false);
  }, 3000);
  // Fetch products from dummyjson API
  

  return (
    <>
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Hero */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 py-16 gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-mono font-extrabold text-gray-800 leading-tight mb-4">
            Welcome to <span className="text-orange-500">Online Shop</span>
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Find exclusive deals, trending gadgets, and stylish fashion delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="shop"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              Start Shopping
            </Link>
          
          </div>
        </div>

        <div className="flex-1">
          <img
            src="https://plus.unsplash.com/premium_photo-1683288295814-84a199da83d9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero"
            className="w-full rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
          />
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className=" font-bold text-gray-800 mb-6 text-center text-4xl font-[cursive]"> Product categories  </h2>

        {loading ? (
          <p className="text-center text-gray-600"><Loader/></p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Mywelcom.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.id}
                  className="h-48 w-full object-cover hover:scale-[1.1] transition-all duration-300 ease-in-out"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 font-[cursive] truncate">
                    {product.category}
                  </h3>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
             
    </>

  );
};

export default Welcomepage;
