import React from "react";
import { motion } from "framer-motion";

const DeleteAccountModal = ({ onConfirm, onCancel }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className="bg-white rounded-lg p-6 w-80 text-center"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
    >
      <h3 className="text-lg font-semibold mb-4">Confirm Account Deletion</h3>
      <p className="text-gray-600 mb-4">
        Are you sure you want to delete your account? This action cannot be undone.
      </p>
      <div className="flex justify-between">
        <button onClick={onCancel} className="px-4 py-2 rounded-md border border-gray-300">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default DeleteAccountModal;
