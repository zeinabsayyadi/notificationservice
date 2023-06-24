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
import {
  owner_dashboard_get_project_entitys,
  owner_dashboard_gt_project_roles,
} from "../../api/owner";
import RoleTable from "../../components/Tabels/RoleTable";
const SingleEntity = () => {
  //const { token } = useSelector(userSelector);
  const token = JSON.parse(localStorage.getItem("token"));
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [entity, setEntity] = useState({});
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    let url = window.location;
    console.log("widows url in singl projet ", url.search);
    let entityId = new URLSearchParams(url.search).get("entity");
    console.log("entity id in single entity", entityId);
    setEntity(entityId);
    axios({
      method: "POST",
      url: `${owner_dashboard_gt_project_roles}?page=${1}&limit=${5}`,
      headers: {
        "x-access-token": token,
      },
      data: {
        entity_id: entityId,
      },
    })
      .then((res) => {
        console.log(res);
        setRoles(res.data.data.docs);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigation = useNavigate();
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography>in the entities</Typography>
        </CardContent>
      </Card>
      {roles?.length > 0 && (
        <RoleTable
          current={roles}
          page={page}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      )}
      <IconButton
        onClick={() =>
          navigation(`/panel/owner/add-role/search?entity=${entity}`)
        }
      >
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    </Box>
  );
};
export default SingleEntity;
