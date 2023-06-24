import { IconButton, TableCell, TableRow, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { owner_dashboard_namespace_delete } from "../../api/owner";
const NamespaceRow = ({ row }) => {
  console.log(row.project.name);
  const navigation = useNavigate();
  const [currentDisplay, setDisplay] = useState("table-row");
  const token = JSON.parse(localStorage.getItem("token"));
  const handleDeleteRole = () => {
    setDisplay("none");
    console.log("loooog: ", row._id);
    console.log("toooken", token);
    axios
      .delete(owner_dashboard_namespace_delete, {
        headers: {
          //"Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": token,
        },

        data: {
          namespace_id: row._id,
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
          {row.project.name}
        </TableCell>
        <TableCell align="right" component="th" scope="row">
          {row.entity.name}
        </TableCell>
        <TableCell align="right" component="th" scope="row">
          {row.role.name}
        </TableCell>
        <TableCell align="right" component="th" scope="row">
          {row.isEnable ? "active" : "deactive"}
        </TableCell>
        <TableCell>
          <IconButton onClick={handleDeleteRole}>
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};
export default NamespaceRow;
