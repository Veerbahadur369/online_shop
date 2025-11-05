import React from "react";

const AvatarUploader = ({ avatarPreview, onFileChange }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={avatarPreview}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover border-2 border-amber-400"
      />
      <label className="mt-2 cursor-pointer text-amber-600 hover:underline">
        Change Avatar
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files[0])}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default AvatarUploader;
