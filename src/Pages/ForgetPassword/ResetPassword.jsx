import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // ✅ Password validation check
    if (newPassword.length < 6) {
      return toast.error("❌ Password must be at least 6 characters long!", { position: "top-center", autoClose: 2000 });
    }

    if (newPassword !== confirmPassword) {
      return toast.error("❌ Passwords do not match!", { position: "top-center", autoClose: 2000 });
    }

    setLoading(true);

    try {
      console.log("🔹 Sending Reset Password Request - Token:", token);
      console.log("🔹 Sending Reset Password Request - Password:", newPassword);

      // ✅ Ensure the API is receiving the correct data format
      const response = await axios.post(
        `http://localhost:3000/api/auth/reset-password`,
        { password: newPassword }, // ✅ Some backends expect "password" instead of "newPassword"
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Reset Password Response:", response);
      toast.success("✅ Password updated! Redirecting...", { position: "top-center", autoClose: 2000 });

      // Redirect to login
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("❌ Reset Password Error:", error);
      const errorMessage = error.response?.data?.error || "❌ Failed to reset password. Try again.";
      toast.error(errorMessage, { position: "top-center", autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      <ToastContainer />
      <div className="w-96 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-500">🔒 Reset Password</h2>

        <form onSubmit={handleResetPassword}>
          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password:</label>
            <div className="relative">
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={22} />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password:</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 font-medium flex justify-center"
            disabled={loading}
          >
            {loading ? "🔄 Updating..." : "🔐 Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
