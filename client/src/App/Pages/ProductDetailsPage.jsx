import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiShoppingCart,
  FiTruck,
  FiRefreshCcw,
  FiStar,
  FiAlertCircle,
  FiShoppingBag,
} from "react-icons/fi";
import { baseUrl } from "../shareUrl";

const ProductDetailsPage = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [thumbnails, setthumbnails] = useState(product?.thumbnail);
  const token = localStorage.getItem("acceessToken");

  const fetchProduct = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/proudct/getDetailsOfProduct/${_id}`,
        {
         // withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(response.data.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <FiAlertCircle className="text-red-500 text-4xl mb-2" />
        <p className="text-lg text-gray-700 mb-4">
          Failed to load product details.
        </p>
        <button
          onClick={fetchProduct}
          className="px-5 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 shadow-md transition flex items-center gap-2"
        >
          <FiRefreshCcw /> Retry
        </button>
      </div>
    );
  }

  if (!product) return null;

  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    images,
    thumbnail,
  } = product;

  const discountedPrice =
    price - (price * discountPercentage) / 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 max-w-7xl mx-auto"
    >
      {/* Breadcrumb */}
      <motion.div
        className="text-sm text-gray-500 mb-4"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Home / {category} /{" "}
        <span className="text-amber-500 font-medium">{title}</span>
      </motion.div>

      {/* Main layout */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image Section */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={thumbnails || thumbnail}
            alt={title}
            className="w-full max-w-md rounded-2xl shadow-lg hover:shadow-amber-200 transition duration-300"
          />
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`product-${i}`}
                onClick={()=>{setthumbnails(img)}}
                className="w-20 h-20 rounded-lg border-2 border-transparent hover:border-amber-500 cursor-pointer transition"
              />
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
          <p className="text-gray-500 mb-2">Brand: {brand}</p>

          <div className="flex items-center gap-2 mb-2">
            <FiStar className="text-yellow-400" />
            <span className="text-gray-700 font-medium">
              {rating} / 5
            </span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <p className="text-2xl font-semibold text-amber-500">
              ₹{discountedPrice.toFixed(2)}
            </p>
            <p className="line-through text-gray-400">₹{price}</p>
            <p className="text-green-600 text-sm font-medium">
              -{discountPercentage}%
            </p>
          </div>

          <p
            className={`text-sm font-medium ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {availabilityStatus} ({stock} in stock)
          </p>

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 shadow-md transition">
              <FiShoppingCart /> Add to Cart
            </button>
            <button className="px-6 py-2 border-2 border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white transition shadow-md">
              Buy Now
            </button>
            <Link to={'/shop'}>
              <button className="flex items-center gap-2 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 shadow-md transition">
              <FiShoppingBag /> Shop
            </button>
            </Link>
            
          </div>

          <p className="mt-5 text-gray-700 leading-relaxed">{description}</p>

          {/* Specifications */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-amber-500 mb-3">
              Specifications
            </h2>
            <ul className="text-gray-700 space-y-1">
              <li>SKU: {sku}</li>
              <li>Weight: {weight} kg</li>
              <li>
                Dimensions: {dimensions.width} x {dimensions.height} x{" "}
                {dimensions.depth} cm
              </li>
              <li>Warranty: {warrantyInformation}</li>
              <li>
                <FiTruck className="inline mr-1 text-amber-500" /> Shipping:{" "}
                {shippingInformation}
              </li>
              <li>
                <FiRefreshCcw className="inline mr-1 text-amber-500" /> Return
                Policy: {returnPolicy}
              </li>
              <li>Min Order: {minimumOrderQuantity}</li>
              <li>
                Tags:{" "}
                {tags?.map((t, i) => (
                  <span
                    key={i}
                    className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs mr-2"
                  >
                    #{t}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <motion.div
        className="mt-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold text-amber-500 mb-4">
          Customer Reviews
        </h2>
        <div className="grid gap-4">
          {reviews?.length ? (
            reviews.map((review, index) => (
              <motion.div
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">
                    {review.user || "Anonymous"}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <FiStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{review.comment}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetailsPage;
