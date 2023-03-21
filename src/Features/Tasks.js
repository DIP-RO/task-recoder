import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const gettasks = createAsyncThunk(
  "gettasks",
  async (object, { getState, rejectWithValue }) => {
    // console.log(object)
    // console.log(getState());
    try {
      const { data, refetch } = await axios.get(
        `http://localhost:5000/tasks?email=${object}`
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

// https://task-manager-v2-server.vercel.app

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [gettasks.pending]: (state, action) => {
      state.loading = true;
    },
    [gettasks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [gettasks.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default taskSlice.reducer;
