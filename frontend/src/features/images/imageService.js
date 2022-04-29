import axios from "axios";

const API_URL = "/api/images/";

// upload image to server
const uploadImage = async (imageData) => {
  try {
    const response = await axios.post(API_URL, imageData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get images
const getImages = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const todoService = {
  uploadImage,
  getImages,
};

export default todoService;
