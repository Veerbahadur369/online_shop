 import axios from 'axios'
 import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { baseUrl } from '../shareUrl';

const ContactUs = () => {
  // ✅ Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // ✅ Handle form submission
  const onSubmit = async (data) => {
    console.log("Form Data:", data);

     try {
       await axios.post(`${baseUrl}/api/v1/nodeMailer/sendEmail`,data)
     
     alert("Message sent successfully!");
     reset(); // clear form after submission
     } catch (error) {
       console.error("Getting error while sending email ",error)
     }
  };

  return (
    <section className="min-h-screen bg-amber-50 flex flex-col items-center justify-center py-16 px-6">
      {/* Main Container */}
      <motion.div
        className="max-w-6xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-10 mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Side - Contact Info */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-600 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8">
            Have a question, feedback, or need assistance? We’d love to hear
            from you! Reach out to us and our team will respond as soon as
            possible.
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-amber-500 text-xl" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-amber-500 text-xl" />
              <span>support@onlineshop.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-amber-500 text-xl" />
              <span>123 Amber Street, New Delhi, India</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.form
          className="space-y-5"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Send Us a Message
          </h3>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-amber-500 focus:outline-none`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Subject field */}
             <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="Enter your subject"
              {...register("subject", { required: "Name is required" })}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-amber-500 focus:outline-none`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("to", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-amber-500 focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              {...register("massage", {
                required: "Message cannot be empty",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters long",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition duration-300 shadow-md disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </motion.div>

      {/* Google Map Section */}
      <motion.div
        className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <h3 className="text-2xl font-semibold text-center text-amber-600 mb-4">
          Find Us on Google Maps
        </h3>

        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden border-4 border-amber-100">
          <iframe
            title="Online Shop Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.775177326067!2d77.21672127506155!3d28.610494775679214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd347a36f7f9%3A0x64f3e6b77b0157b3!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1695981234567!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
