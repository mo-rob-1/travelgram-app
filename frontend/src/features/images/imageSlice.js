import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imageService from "./imageService";

const initialState = {
  images: [],
  image: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// upload image to server and cloudinary
export const uploadImage = createAsyncThunk("images/uploadImage", async (imageData) => {
  try {
    const response = await imageService.uploadImage(imageData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// ger all images from server
export const getImages = createAsyncThunk("images/getImages", async (imageData, { rejectWithValue }) => {
  try {
    const response = await imageService.getImages();
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// image slice
const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "Image uploaded successfully";
      state.images.push(action.payload);
    });
    builder.addCase(uploadImage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    });
    builder.addCase(getImages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getImages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.images = action.payload;
    });
    builder.addCase(getImages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    });
  },
});

// export actions
export const { reset } = imageSlice.actions;

// export reducer
export default imageSlice.reducer;
