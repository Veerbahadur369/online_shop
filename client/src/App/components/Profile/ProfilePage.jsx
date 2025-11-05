// src/pages/ProfilePage.jsx
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiUser, FiSettings, FiLogOut, FiBox } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../../shareUrl";
 

const ProfilePage = () => {
  const [avatarPreview, setAvatarPreview] = useState("/default-avatar.png");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('acceessToken')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "123-456-7890",
      address1: "123 Main St",
      address2: "Springfield, IL 62701",
    },
  });

  const onSubmit = async (data) => {
    
  };

const handleAvatarChange =  async (e) => {
  const file =  e.target.files[0];
   
  setImage(file);
  console.log("This is image",image)
  setAvatarPreview(URL.createObjectURL(file));
   
  const formdata = new FormData();
  formdata.append("avatar",file);
  
  try {
    
    const response =await  axios.patch(
      `${baseUrl}/api/v1/user/updateAvatarImage`,
     formdata,
    {
          withCredentials:true,
          headers:{
          
              Authorization: `Bearer ${token}`
          }
        }
    );
    toast.success(response.data.message)
    console.log(response.data);
  } catch (err) {
    console.error('Error while uploading image:', err);
  }
};

  
   

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("/api/user/delete");
      alert("Account deleted successfully!");
      setShowDeleteModal(false);
    } catch (err) {
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-amber-50 p-6 border-r">
        <h2 className="text-xl font-bold text-amber-600 mb-6">My Account</h2>
        <nav className="space-y-4">
          <Link  className="flex items-center gap-3 text-gray-700
          focus:text-amber-700 font-medium focus:bg-amber-200 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <FiUser /> Profile
          </Link >
          <Link  className="flex items-center gap-3 text-gray-700
          focus:text-amber-700 font-medium focus:bg-amber-200 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <FiBox /> My Orders
          </Link >
          <Link  className="flex items-center gap-3 text-gray-700
          focus:text-amber-700 font-medium focus:bg-amber-200 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <FiSettings /> Settings
          </Link >
          <Link  className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <FiLogOut /> Logout
          </Link >
        </nav>
      </aside>
<ToastContainer/>
      {/* Main Content */}
      <motion.main
        className="flex-1 p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
              <p className="text-gray-500">
                Manage your account information
              </p>
            </div>

            <div className="relative">
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border-4 border-amber-500 shadow-md"
              />
              <label
                htmlFor="avatar"
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white border border-amber-500 text-amber-600 text-sm px-3 py-1 rounded-lg cursor-pointer hover:bg-amber-50"
              >
                Change
              </label>
              <input
                type="file"
                id="avatar"
               name="avatar"
                {...register("avatar")}
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone
              </label>
              <input
                {...register("phone")}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Address Line 1
              </label>
              <input
                {...register("address1")}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Address Line 2
              </label>
              <input
                {...register("address2")}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl font-medium"
              >
                Save Changes
              </button>
              <button
                type="reset"
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl font-medium"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Danger Zone */}
          <div className="mt-10 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <h2 className="font-semibold mb-2">Danger Zone</h2>
            <p className="text-sm mb-3">
              Deleting your account is permanent and cannot be undone.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
            >
              Delete Account
            </button>
          </div>
        </div>
      </motion.main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            className="bg-white rounded-xl p-8 shadow-lg w-96"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Confirm Account Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
