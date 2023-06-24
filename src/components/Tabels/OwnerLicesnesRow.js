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
export default function OwnerLicenseTable({ row }) {
  const { token } = useSelector(userSelector);
  const localToken = JSON.parse(localStorage.getItem(token));
  const navigation = useNavigate();
  const [currentDisplay, setDisplay] = useState("table-row");
 
  
  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, display: currentDisplay }}
      >
        <TableCell
          align="right"
          component="th"
          scope="row"
         
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
          <IconButton >
            <CreateOutlinedIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton >
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

OwnerLicenseTable.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
