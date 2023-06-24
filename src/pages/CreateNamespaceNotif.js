import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Style } from "../components/forms/forms.style";
import CreateNameSpaceForm from "../components/forms/owner/createNameSpaceForm";
import { owner_dashboard_create_name_space_notify } from "../api/owner";
const CreateNamespaceNotif = () => {
  return (
    <CreateNameSpaceForm
      namespaceRout={owner_dashboard_create_name_space_notify}
    />
  );
};
export default CreateNamespaceNotif;
