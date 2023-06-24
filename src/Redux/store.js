import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/UserSlice";
import { domSlice } from "./features/DomSlice";
import { ProjectsSlice } from "./features/projectsSlice";
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    dom: domSlice.reducer,
    projects: ProjectsSlice.reducer,
  },
});
