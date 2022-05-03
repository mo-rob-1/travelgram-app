import axios from "axios";

const API_URL = "/api/images/";

// Add a car
const uploadImage = async (imageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, imageData, config);

  return response.data;
};

// Get images
const getImages = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Get users images
const getUserImages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete image
const deleteImage = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}${id}`, config);

  return response.data;
};

const imageService = {
  uploadImage,
  getImages,
  getUserImages,
  deleteImage,
};

export default imageService;
