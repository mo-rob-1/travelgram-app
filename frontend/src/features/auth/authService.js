import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => localStorage.removeItem("user");

// Get all users
const getUsers = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Get user by id
const getUserById = async (userId) => {
  const response = await axios.get(API_URL + userId);

  return response.data;
};

// Update user
const updateUser = async (userId, userData) => {
  const response = await axios.put(API_URL + userId, userData);

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getUsers,
  getUserById,
  updateUser,
};

export default authService;
