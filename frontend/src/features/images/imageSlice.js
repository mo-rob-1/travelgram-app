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

export const uploadImage = createAsyncThunk("images/uploadImage", async (imageData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await imageService.uploadImage(imageData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
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

// get user images by id from server
export const getUserImages = createAsyncThunk("images/getUserImages", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await imageService.getUserImages(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// delete image from server
export const deleteImage = createAsyncThunk("images/deleteImage", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await imageService.deleteImage(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// image slice
export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // upload image
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      // get users images
      .addCase(getUserImages.fulfilled, (state, action) => {
        state.images = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getUserImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserImages.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.images = state.images.filter((image) => image._id !== action.payload);
      })
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

// export actions
export const { reset } = imageSlice.actions;

// export reducer
export default imageSlice.reducer;
