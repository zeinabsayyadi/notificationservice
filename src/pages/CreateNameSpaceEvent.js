import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Style } from "../components/forms/forms.style";
import CreateNameSpaceForm from "../components/forms/owner/createNameSpaceForm";
import { owner_dashboard_create_name_space_event } from "../api/owner";
const CreateNameSpaceEvent = () => {
  return (
    <CreateNameSpaceForm
      namespaceRout={owner_dashboard_create_name_space_event}
    />
  );
};
export default CreateNameSpaceEvent;
