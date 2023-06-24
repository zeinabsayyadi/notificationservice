import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    type: null, //owner admin
    token: "",
    license_key: "",
    access_key: "",
  },
  reducers: {
    clearState: (state) => {
      state.type = null;
      state.token = null;
      state.access_key = "";
      state.license_key = "";
      return state;
    },
    sign: (state, action) => {
      state.type = action?.payload?.type;
      state.token = action?.payload?.token;
      state.access_key = action?.payload?.access_key || "";
      state.license_key = action?.payload?.license_key || "";
      return state;
    },
    fetchUserBytoken: (state, action) => {
      state.type = action?.payload?.type;
      state.token = action?.payload?.token;
      state.access_key = action?.payload?.access_key || "";
      state.license_key = action?.payload?.license_key || "";
      return state;
    },
  },
});

export const { clearState, fetchUserBytoken, sign } = userSlice.actions;
export const userSelector = (state) => state.user;
