import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Import Components
import About from "./components/About/About";
import CarList from "./Pages/CarList/CarList";
import CarDetails from "./Pages/CarDetails/CarDetails";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services";
import Testimonial from "./components/Testimonial/Testimonial";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import BookingForm from "./Pages/Booking/BookingForm";
import Profile from "./Pages/Profile/Profile";
import EditProfile from "./Pages/EditProfile/EditProfile";
import MyBookings from "./Pages/MyBooking/MyBookings";

// Import Admin Pages
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminPanel from "./Pages/Admin/AdminPanel";
import ManageUsers from "./Pages/Admin/ManageUsers";
import ManageBookings from "./Pages/Admin/ManageBookings";
import ManageCars from "./Pages/Admin/ManageCars";
import AddVehicle from "./Pages/Admin/AddVehicle";
import EditVehicle from "./Pages/Admin/EditVehicle";
import Sidebar from "./components/Sidebar/Sidebar";

// ✅ Corrected Import Paths for Forget/Reset Password
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ForgetPassword/ResetPassword";

const Home = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <Hero />
      <About />
      <Services />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
};

// ✅ **Check if User is Authenticated**
const isAuthenticated = () => !!localStorage.getItem("token");

// ✅ **Get User Role**
const getUserRole = () => localStorage.getItem("role") || "user";

// ✅ **Protected Route for Users**
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// ✅ **Admin Protected Route (With Sidebar)**
const AdminRoute = ({ element }) => {
  if (!isAuthenticated() || getUserRole() !== "admin") {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-56 p-6 bg-gray-100">{element}</div>
    </div>
  );
};

// ✅ **Layout Component to Hide Navbar for Admin Pages**
const Layout = ({ children, theme, setTheme }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white min-h-screen">
      {!isAdminPage && <Navbar theme={theme} setTheme={setTheme} />}
      {children}
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedUser = {
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role"),
    };
    if (storedUser.username) setUser(storedUser);

    AOS.init({ offset: 100, duration: 800, easing: "ease-in-sine", delay: 100 });

    console.log("✅ App Loaded with User:", storedUser);
    console.log("✅ Theme:", theme);
  }, []);

  return (
    <Router>
      <Layout theme={theme} setTheme={setTheme}>
        <Routes>
          {/* 🔹 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetails />} />

          {/* 🔹 Forgot & Reset Password Routes (✅ Fixed Issue) */}
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* 🔹 Protected Routes (Users) */}
          <Route path="/booking/:id" element={<ProtectedRoute element={<BookingForm />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/edit-profile/:id" element={<ProtectedRoute element={<EditProfile setUser={setUser} />} />} />
          <Route path="/my-bookings" element={<ProtectedRoute element={<MyBookings />} />} />

          {/* 🔹 Admin Routes (Sidebar Included) */}
          <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
          <Route path="/admin/manage-users" element={<AdminRoute element={<ManageUsers />} />} />
          <Route path="/admin/manage-bookings" element={<AdminRoute element={<ManageBookings />} />} />
          <Route path="/admin/manage-cars" element={<AdminRoute element={<ManageCars />} />} />
          <Route path="/admin/manage-cars/edit/:id" element={<AdminRoute element={<EditVehicle />} />} />
          <Route path="/admin/add-vehicle" element={<AdminRoute element={<AddVehicle />} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
