import axios from "axios";

// ✅ Ensure Base URL is correct
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// ✅ Register User API
export const registerUser = async (userData) => {
    try {
        console.log("📤 Sending request to:", `${API_BASE_URL}/auth/register`);
        const response = await api.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        console.error("❌ Registration Error:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Login User API
export const loginUser = async (userData) => {
    try {
        console.log("📤 Sending login request to:", `${API_BASE_URL}/auth/login`);
        const response = await api.post("/auth/login", userData);
        return response.data;
    } catch (error) {
        console.error("❌ Login Error:", error.response?.data || error.message);
        throw error;
    }
};

export default api;
