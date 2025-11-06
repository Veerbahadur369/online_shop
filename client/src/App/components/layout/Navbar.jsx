import  { useState } from "react";
import { Link, Links, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaShoppingCart, FaUser, FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import logo from '../../../assets/b2315d5f-cc73-4a54-bbdd-66f7fde2fffc.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const cartCount = 2; // example count, replace with your cart context or state
    const userData =useSelector(state=>state.loginData).data.sendData;
    const token =useSelector(state=>state.loginData).data.accessToken;
    localStorage.setItem('acceessToken',token)
 

  return (
    <nav
      className={`sticky top-0 z-50 w-full shadow-md transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <img src={logo} className="h-15  w-15 rounded-full " alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium">
          {["Home","About", "Shop","Contact", "Blog",  ].map((item) => (
            <li key={item}>
              <NavLink
                to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className={({ isActive }) =>
                  `hover:text-amber-500 transition-colors ${
                    isActive ? "text-amber-500" : ""
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button onClick={toggleSearch}>
            <FaSearch size={20} />
          </button>

          {/* Wishlist */}
          <Link to="/wishlist">
            <FaHeart size={20} />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          <div>
          {userData?.avatar ?<Link to="/profile"><img className="h-10 w-10 rounded-full  " src={userData?.avatar?.url} alt={userData?._id} /></Link>  :<Link to={'/login'}> <FaUser size={20}/> </Link>}
            
          </div>

          {/* Dark Mode */}
          <button onClick={toggleDarkMode}>
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          {/* Hamburger Menu */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden flex flex-col items-center gap-4 py-4 ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            {["Home", "Shop", "Categories", "About", "Contact"].map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg hover:text-amber-500 transition-colors ${
                      isActive ? "text-amber-500" : ""
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-16 left-0 w-full flex justify-center ${
              darkMode ? "bg-gray-900" : "bg-white"
            } py-3 shadow-md`}
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-3/4 md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-amber-300"
            />
            <button
              onClick={toggleSearch}
              className="ml-3 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
