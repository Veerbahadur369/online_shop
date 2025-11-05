// ProductCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
};

const ProductCard = ({ product }) => {
  const {_id, title, thumbnail, price, category, discountPercentage, rating, availabilityStatus } = product;

  // Format price to US dollars
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <Link to={`details/${_id}`}>
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.5), 0 4px 6px -2px rgba(245, 158, 11, 0.05)' }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full z-10 shadow-md">
            SALE! {discountPercentage.toFixed(0)}% OFF
          </div>
        )}
        <img
          src={thumbnail || 'https://via.placeholder.com/400'}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-800 bg-amber-100 rounded-full mb-2">
          {category}
        </span>
        <h3 className="text-lg font-bold text-gray-800 truncate mb-1" title={title}>
          {title}
        </h3>
        <div className="flex justify-between items-center mb-3">
          <p className="text-2xl font-extrabold text-amber-700">
            {formattedPrice}
          </p>
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-amber-500 mr-1">⭐️</span>
            {rating ? rating.toFixed(1) : 'N/A'}
          </div>
        </div>
        
        <p className={`text-sm font-medium ${availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-red-500'} mb-4`}>
          {availabilityStatus}
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 transition duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
    </Link>
  );
};

export default ProductCard;