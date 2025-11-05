import React from "react";
import { motion } from "framer-motion";
import { FaShoppingBag, FaHeart, FaBolt } from "react-icons/fa";

const About = () => {
  return (
    <section className="min-h-screen bg-amber-50 text-gray-800 flex items-center justify-center px-6 py-16">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-amber-600 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          About <span className="text-gray-900">Online Shop</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Welcome to <span className="font-semibold text-amber-600">Online Shop</span> — 
          your trusted destination for everything stylish, trendy, and affordable.
          Inspired by the warmth of amber, we’re here to make online shopping
          effortless, enjoyable, and full of vibrant energy.
        </motion.p>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-amber-200 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <FaShoppingBag className="text-amber-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Curated Collections</h3>
            <p className="text-gray-600">
              Explore a handpicked range of products that blend quality, comfort, and trend.
            </p>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-amber-200 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <FaHeart className="text-amber-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">
              Every order, every interaction — we focus on care, trust, and satisfaction.
            </p>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-amber-200 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <FaBolt className="text-amber-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
            <p className="text-gray-600">
              Enjoy quick delivery and secure checkout with a seamless shopping experience.
            </p>
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-16 text-xl font-medium text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          🛍️ <span className="text-amber-600 font-semibold">Discover. Choose. Shine.</span>  
          Only at <span className="font-bold">Online Shop</span>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default About;
