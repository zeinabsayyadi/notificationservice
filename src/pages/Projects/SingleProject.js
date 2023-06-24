import {
  Box,
  Card,
  CardContent,
  IconButton,
  ListItem,
  Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import EntityTable from "../../components/Tabels/EntityTable";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useEffect, useState } from "react";
import axios from "axios";
import { owner_dashboard_get_project_entitys } from "../../api/owner";
import InnerSidebar from "../../components/InnerSidebar";
const SingleProject = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const currentProject = JSON.parse(localStorage.getItem("CurrentProject"));
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [project, setProject] = useState({});
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    let url = window.location;
    console.log("widows url in singl projet ", url.search);
    let projectID = new URLSearchParams(url.search).get("project");
    console.log("rpject id in single project", projectID);
    currentProject._id === projectID && setProject(projectID);
    axios({
      method: "POST",
      url: `${owner_dashboard_get_project_entitys}?page=${1}&limit=${5}`,
      headers: {
        "x-access-token": token,
      },
      data: {
        project_id: projectID,
      },
    })
      .then((res) => {
        console.log("res of entitys", res?.data?.data?.docs);
        //setProject(res?.data);
        setEntities(res?.data?.data?.docs);
      })
      .catch((err) => {
        console.log("err in get eentity");
      });
  }, []);

  const navigation = useNavigate();
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography>in the entities</Typography>
        </CardContent>
      </Card>
      <Box>
        <InnerSidebar current={[currentProject]} />
        {entities?.length > 0 && (
          <EntityTable
            current={entities}
            page={page}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        )}
      </Box>

      <IconButton
        onClick={() =>
          navigation(`/panel/owner/add-entity/search?project=${project}`)
        }
      >
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    </Box>
  );
};
export default SingleProject;
