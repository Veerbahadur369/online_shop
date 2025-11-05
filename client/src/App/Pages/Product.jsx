import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { FaFilter, FaTimes } from 'react-icons/fa';
import Loader from '../components/common/Loader';
import { baseUrl } from '../shareUrl';

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 1000,
    discountOnly: false,
  });
  const [sortBy, setSortBy] = useState('price-asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
const token= localStorage.getItem("acceessToken")
  // ✅ Fetch products once
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('hello')
        const { data } = await axios.get(`${baseUrl}/api/v1/proudct/getAllProudcts`,{
          withCredentials:true,
          headers:{
             "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
        });
        if (isMounted) setAllProducts(data.data || []);
      } catch (err) {
        console.error(err);
        if (isMounted) setError('Failed to fetch product data. Please check the server connection.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Memoized unique values
  const uniqueCategories = useMemo(
    () => [...new Set(allProducts.map(p => p.category))].filter(Boolean),
    [allProducts]
  );
  const uniqueBrands = useMemo(
    () => [...new Set(allProducts.map(p => p.brand))].filter(Boolean),
    [allProducts]
  );

  // ✅ Memoized filter + sort logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];
    const { category, brand, minPrice, maxPrice, discountOnly } = filters;

    result = result.filter(p => {
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (p.price < minPrice || p.price > maxPrice) return false;
      if (discountOnly && !p.discountPercentage) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price);
      case 'price-desc': return result.sort((a, b) => b.price - a.price);
      case 'rating-desc': return result.sort((a, b) => b.rating - a.rating);
      case 'title-asc': return result.sort((a, b) => a.title.localeCompare(b.title));
      default: return result;
    }
  }, [allProducts, filters, sortBy]);

  // ✅ Debounced filter change handler
  const handleFilterChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name.includes('Price') ? Number(value) : value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 1000,
      discountOnly: false,
    });
    setSortBy('price-asc');
  }, []);

  // ✅ Early returns
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Loader />
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-xl mx-auto mt-8">
      <p className="font-bold">Error</p>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Floating Filter Button (Mobile) */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-amber-500 text-white shadow-xl hover:bg-amber-600 transition duration-300 lg:hidden"
        aria-label="Toggle Filters"
      >
        <FaFilter className="h-6 w-6" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex">
        {/* ✅ Filter Sidebar using <aside> */}
        <aside  style={{position:"fixed",top:"100px"}}
          className={` inset-y-0 left-0 w-64 fixed bg-white p-6 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out border-r border-gray-100 lg:relative lg:translate-x-0 lg:shadow-none lg:w-1/4 xl:w-1/5 ${
            isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:block'
          }`}
        >
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-800">
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Filter Options</h2>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring-amber-500"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Brand */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring-amber-500"
            >
              <option value="">All Brands</option>
              {uniqueBrands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min"
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring-amber-500"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max"
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Discount */}
          <div className="mb-6">
            <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="discountOnly"
                checked={filters.discountOnly}
                onChange={handleFilterChange}
                className="h-4 w-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
              />
              <span className="ml-2">Show only discounted items</span>
            </label>
          </div>

          <button
            onClick={clearFilters}
            className="w-full py-2 border border-amber-500 text-amber-500 font-semibold rounded-md hover:bg-amber-50 transition duration-200"
          >
            Clear Filters
          </button>
        </aside>

        {/* ✅ Product Grid */}
        <div className="w-full ml-40 lg:w-3/4 xl:w-4/5 lg:pl-8">
          <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Product Catalog ({filteredAndSortedProducts.length} items)
            </h1>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700 hidden sm:block">
                Sort By:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-md text-sm focus:border-amber-500 focus:ring-amber-500"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="title-asc">Name: A-Z</option>
              </select>
            </div>
          </header>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="p-10 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-2xl font-semibold mb-2">🤷‍♂️ No Products Match Your Filters</p>
              <p>Try adjusting your price range, category, or discount selection.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
