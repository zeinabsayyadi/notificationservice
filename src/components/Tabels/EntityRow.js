import {
  Box,
  Collapse,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import axios from "axios";
import {
  owner_dashboard_delete_project_entity,
  owner_dashboard_gt_project_roles,
} from "../../api/owner";
import RoleTable from "./RoleTable";

export default function EntityRow({ row }) {
  //get entity by useEFfect
  const theme = useTheme();
  const token = JSON.parse(localStorage.getItem("token"));
  const navigation = useNavigate();
  const [currentDisplay, setDisplay] = useState("table-row");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openrole, setOpenrole] = useState(false);
  const [currentRoles, setCurrentRoles] = useState([]);
  const handleClickRow = () => {
    localStorage.setItem("entityId", JSON.stringify(row._id));
    navigation(`/panel/owner/single-entity/search?entity=${row._id}`);
  };
  const handleDeleteEntity = () => {
    setDisplay("none");
    console.log("loooog: ", row.project_id, row._id);
    console.log("toooken", token);
    axios
      .delete(owner_dashboard_delete_project_entity, {
        headers: {
          //"Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": token,
        },

        data: {
          project_id: row.project_id,
          entity_id: row._id,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("entity", "");
      });
  };
  const handleUpdateEntity = () => {
    localStorage.setItem("entity", JSON.stringify(row));
    navigation(`/panel/owner/update-entity/${row.project_id}/${row._id}`);
  };
  const handleCreateRole = () => {
    localStorage.setItem("entityID", JSON.stringify(row._id));
    navigation(`/panel/owner/add-role/search?entity=${row._id}`);
  };
  const handleOpenRoles = () => {
    setOpenrole(!openrole);
    axios({
      method: "POST",
      url: `${owner_dashboard_gt_project_roles}?page=${1}&limit=${5}`,
      headers: {
        "x-access-token": token,
      },
      data: {
        entity_id: row._id,
      },
    })
      .then((res) => {
        console.log(res);
        setCurrentRoles(res.data.data.docs);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, display: currentDisplay }}
      >
        <TableCell component="th" scope="row" onClick={handleClickRow}>
          {row.name}
        </TableCell>
        <TableCell align="right" component="th" scope="row">
          {row.description}
        </TableCell>
        <TableCell>
          <IconButton onClick={handleDeleteEntity}>
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={handleUpdateEntity}>
            <CreateOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

EntityRow.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
  }).isRequired,
};
