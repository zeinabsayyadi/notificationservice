import { createSlice } from "@reduxjs/toolkit";

export const domSlice = createSlice({
  name: "dom",
  initialState: {
    lang: "en",
    dir: "ltr",
    local: "en-US",
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action?.payload?.lang || "en";
      state.dir = action?.payload?.dir || "ltr";
      state.local = action?.payload?.local || "en-US";
      return state;
    },
    fetchDomBytoken: (state, action) => {
      state.lang = action?.payload?.lang;
      state.dir = action?.payload?.dir;
      state.local = action?.payload?.local;
      return state;
    },
  },
});

export const { changeLang, fetchDomBytoken } = domSlice.actions;
export const domSelector = (state) => state.dom;
