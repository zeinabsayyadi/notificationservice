import { createSlice } from "@reduxjs/toolkit";

export const ProjectsSlice = createSlice({
  name: "projects",
  initialState: {
    updateStatus: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.updateStatus = action?.payload?.status;
      return state;
    },
  },
});

export const { setStatus } = ProjectsSlice.actions;
export const projectsSelector = (state) => state.projects;
