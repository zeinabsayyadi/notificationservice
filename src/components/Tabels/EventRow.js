import { IconButton, TableCell, TableRow, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { owner_dashboard_delete_project_entity_role } from "../../api/owner";
export default function EventRow({ row }) {
  const navigation = useNavigate();
  const [currentDisplay, setDisplay] = useState("table-row");
  const token = JSON.parse(localStorage.getItem("token"));
  const handleDeleteRole = () => {
    setDisplay("none");
    console.log("loooog: ", row.entity_id, row._id);
    console.log("toooken", token);
    axios
      .delete(owner_dashboard_delete_project_entity_role, {
        headers: {
          //"Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": token,
        },

        data: {
          entity_id: row.entity_id,
          role_id: row._id,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("err in delete role", err);
      });
  };

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, display: currentDisplay }}
      >
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right" component="th" scope="row">
          {row.description}
        </TableCell>
        <TableCell>
          <IconButton onClick={handleDeleteRole}>
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

EventRow.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.bool.isRequired,
  }).isRequired,
};
