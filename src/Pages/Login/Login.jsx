import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api"; 
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = { email, password };
      const response = await loginUser(userData);

      console.log("🔹 API Response:", response); // Debugging

      if (!response.userId || !response.username || !response.email || !response.role) {
        throw new Error("❌ User details not found in response");
      }

      // ✅ Store user info in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId); // 🔥 FIXED: Storing `userId`
      localStorage.setItem("username", response.username);
      localStorage.setItem("email", response.email);
      localStorage.setItem("role", response.role); 

      console.log("✅ Stored User ID:", localStorage.getItem("userId"));

      toast.success(`✅ Welcome, ${response.username}!`, {
        position: "top-center",
        autoClose: 2000,
      });

      // 🔹 Redirect user based on role
      setTimeout(() => {
        navigate(response.role === "admin" ? "/admin" : "/");
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error("❌ Login Error:", error);
      toast.error(error.response?.data?.error || "❌ Login failed. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      <ToastContainer />
      <div className="w-96 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-500">🔓 Login</h2> {/* ✅ CHANGED TITLE */}

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email:</label>
            <div className="relative">
              <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={22} />
              <input
                type="email"
                className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password:</label>
            <div className="relative">
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={22} />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 pl-10 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="mb-4 text-right">
            <button
              type="button"
              className="text-blue-500 hover:underline text-sm"
              onClick={() => navigate("/forgot-password")} // ✅ Redirect to Forgot Password
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 font-medium flex justify-center"
            disabled={loading}
          >
            {loading ? "🔄 Logging in..." : "🔓 Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
