import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/api";  // ✅ Ensure correct API import
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // ✅ Added Phone Field
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userData = { username: name, email, phone, password }; // ✅ Now including `phone`
      console.log("📤 Sending Registration Data:", userData);

      const response = await registerUser(userData);
      console.log("✅ Registration Success:", response);

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("❌ Registration Error:", error);
      setError(error.response?.data?.error || "Registration failed. Check console.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleRegister}>
          {/* Full Name Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium">Full Name:</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 pl-10 border border-gray-300 text-gray-800 bg-white rounded-lg mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium">Email:</label>
            <div className="relative">
              <input
                type="email"
                className="w-full p-3 pl-10 border border-gray-300 text-gray-800 bg-white rounded-lg mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>

          {/* ✅ Phone Number Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium">Phone Number:</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 pl-10 border border-gray-300 text-gray-800 bg-white rounded-lg mt-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <AiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 pl-10 pr-10 border border-gray-300 text-gray-800 bg-white rounded-lg mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium">Confirm Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 pl-10 border border-gray-300 text-gray-800 bg-white rounded-lg mt-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
