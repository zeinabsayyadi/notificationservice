import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { panel_owner_get_all_projects } from "../../api/owner";
import ProjectsTable from "../../components/Tabels/ProjectsTable";
import { projectsSelector } from "../../Redux/features/projectsSlice";
import { userSelector } from "../../Redux/features/UserSlice";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, sestRowsPerPage] = useState(5);
  const { status } = useSelector(projectsSelector);
  const { token } = useSelector(userSelector);
  const localToken = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    console.log("statuus", status);
    console.log("token in project", token);
    if (token || localToken) {
      axios
        .post(
          `${panel_owner_get_all_projects}?page=${page}&limit=${rowsPerPage}`,
          null,
          {
            headers: {
              //"Access-Control-Allow-Headers": "x-access-token",
              "x-access-token": token ? token : localToken ? localToken : null,
            },
          }
        )
        .then((res) => {
          setProjects(res.data.data.docs);
          console.log("result in project", res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [status]);
  return (
    <ProjectsTable
      projects={projects}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      sestRowsPerPage={sestRowsPerPage}
    />
  );
};
export default Projects;
