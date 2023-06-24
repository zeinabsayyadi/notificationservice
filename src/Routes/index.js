import { Route, Routes } from "react-router-dom";
import CreateEntity from "../components/forms/owner/CreateEntitiy";
import CreateProjectName from "../components/forms/owner/CreateProjectName";
import Layout from "../Layout";
import AllOwners from "../pages/AllOwners";
import CreateLicense from "../pages/CreateLicense";
import CreateService from "../pages/CreateService";
import Panel from "../pages/Panel";
import SingleProject from "../pages/Projects/SingleProject";
import CreateRole from "../components/forms/owner/CreateRole";
import UpdateEntity from "../components/forms/owner/UpdateEntity";
import UpdateProject from "../components/forms/owner/UpdateProject";
import Projects from "../pages/Projects";
import UpdateRole from "../components/forms/owner/UpdateRole";
import Login from "../pages/Login";
import CreateEvent from "../components/forms/owner/CreateEvent";
import SingleEntity from "../pages/Projects/SingleEntity";
import CreateNotify from "../components/forms/owner/CreateNotify";
import CreateNameSpaceEvent from "../pages/CreateNameSpaceEvent";
import CreateNamespaceNotif from "../pages/CreateNamespaceNotif";
import EventNamespace from "../pages/EventNamespace";
import NotifyNamespace from "../pages/NotifyNamespace";
import Events from "../pages/Events";
import Notifies from "../pages/Notifies";
import SingleOwner from "../pages/SingleOwner";
const CustomRoutes = ({ mode, setMode }) => {
  return (
    <Layout setMode={setMode} mode={mode}>
      <Routes>
        <Route path={"/*"} element={<Panel />} />
        <Route path="/panel/admin/create_license" element={<CreateLicense />} />
        <Route path="/panel/admin/create_service" element={<CreateService />} />
        <Route path="/panel/admin/all_owners" element={<AllOwners />} />
        <Route
          path="/panel/admin/single-owner/:single_owner"
          element={<SingleOwner />}
        />
        <Route
          path="/panel/owner/create_project"
          element={<CreateProjectName />}
        />
        <Route
          path="/panel/owner/projects"
          element={<Projects />} //create a all projects page and add projectTable there and load data there
        />
        <Route path="/panel/owner/entity" element={<CreateEntity />} />
        <Route
          path="/panel/owner/single-projects/:SingleProject"
          element={<SingleProject />}
        />
        <Route
          path="/panel/owner/single-projects/:SingleProject/update-project"
          element={<UpdateProject />}
        />
        <Route
          path="/panel/owner/add-entity/:SingleProject"
          element={<CreateEntity />}
        />
        <Route
          path="/panel/owner/add-role/:SingleEntity"
          element={<CreateRole />}
        />
        <Route
          path="/panel/owner/update-entity/:SingleProject/:singleEntity"
          element={<UpdateEntity />}
        />
        <Route
          path="/panel/owner/single-entity/:SignleEntity"
          element={<SingleEntity />}
        />
        <Route
          path="/panel/owner/update-role/:singleEntity"
          element={<UpdateRole />}
        />
        <Route
          path="/panel/owner/create/namespace/event"
          element={<CreateNameSpaceEvent />}
        />
        <Route
          path="/panel/owner/create/namespace/notify"
          element={<CreateNamespaceNotif />}
        />
        <Route
          path="/panel/owner/event/namespace"
          element={<EventNamespace />}
        />
        <Route
          path="/panel/owner/notify/namespace"
          element={<NotifyNamespace />}
        />
        <Route path="/panel/owner/notifications" element={<Notifies />} />
        <Route path="/panel/login_admin" element={<Login />} />
        <Route path="/panel/owner/create/event" element={<CreateEvent />} />
        <Route path="/panel/owner/create/notify" element={<CreateNotify />} />
        <Route path="/panel/owner/events" element={<Events />} />
      </Routes>
    </Layout>
  );
};
export default CustomRoutes;
