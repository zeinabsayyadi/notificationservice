import { IconButton, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import axios from "axios";
import { owner_dashboard_delete_project } from "../../api/owner";
import { useState } from "react";
import { userSelector } from "../../Redux/features/UserSlice";
export default function ProjectRow({ row }) {
  const { token } = useSelector(userSelector);
  const localToken = JSON.parse(localStorage.getItem(token));
  const navigation = useNavigate();
  const [currentDisplay, setDisplay] = useState("table-row");
  const editeProject = () => {
    localStorage.setItem("CurrentProject", JSON.stringify(row));
    navigation(
      `/panel/owner/single-projects/project=${row._id}/update-project`
    );
  };
  const deleteProject = () => {
    console.log(row);
    setDisplay("none");
    console.log("token in delete: ", token);
    console.log("localtoken", localToken);
    axios
      .delete(owner_dashboard_delete_project, {
        headers: {
          //"Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": token !== undefined ? token : null,
        },

        data: {
          project_id: row._id,
        },
      })
      .then((res) => {
        navigation(`/panel/ownerprojects`);
        console.log(res);
      })
      .catch((err) => console.log("error in delete: ", err));
  };
  const handleClickRow = () => {
    localStorage.setItem("CurrentProject", JSON.stringify(row));
    console.log("row id in project row", row._id);
    navigation(`/panel/owner/single-projects/search?project=${row._id}`);
  };
  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, display: currentDisplay }}
      >
        <TableCell
          align="right"
          component="th"
          scope="row"
          onClick={handleClickRow}
        >
          {row.name}
        </TableCell>
        <TableCell align="right" component="th" scope="row">
          {row.url}
        </TableCell>
        <TableCell align="right" component="th" scope="row">
          {row.description}
        </TableCell>
        <TableCell>
          <IconButton onClick={editeProject}>
            <CreateOutlinedIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={deleteProject}>
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

ProjectRow.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
