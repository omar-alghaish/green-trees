import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Thunk action to fetch user data asynchronously
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    try {
      // Simulate fetching user data from an API
      const response = await fetch("https://api.example.com/user");
      const userData = await response.json();
      return userData;
    } catch (error) {
      throw Error("Error fetching user data:", error);
    }
  }
);

// Create a slice for the user reducer
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    status: "idle", // Possible states: 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    // Additional reducers can be added here if needed
  },
  extraReducers: {
    // Handle pending state when fetching user data starts
    [fetchUserData.pending]: (state) => {
      state.status = "loading";
    },
    // Handle success state when fetching user data succeeds
    [fetchUserData.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userData = action.payload;
      localStorage.setItem(
        "greenTreesUserData",
        JSON.stringify(action.payload)
      );
    },
    // Handle failure state when fetching user data fails
    [fetchUserData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Export actions generated by the user slice
export const { updateUserData } = userSlice.actions;

// Export the reducer function
export default userSlice.reducer;
