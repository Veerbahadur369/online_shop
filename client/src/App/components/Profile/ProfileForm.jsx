import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AvatarUploader from "./AvatarUploader";

const ProfileForm = ({ user, onSubmit }) => {
  const [avatarPreview, setAvatarPreview] = useState(user.avatar?.url);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const handleAvatarChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-semibold text-amber-600 mb-4">Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AvatarUploader
          avatarPreview={avatarPreview}
          onFileChange={handleAvatarChange}
        />

        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-amber-500"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="w-full p-2 border rounded-md focus:outline-amber-500"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Phone</label>
          <input
            {...register("phone")}
            type="text"
            className="w-full p-2 border rounded-md focus:outline-amber-500"
          />
        </div>

        <button
          type="submit"
          className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
