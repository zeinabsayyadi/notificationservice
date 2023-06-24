import { IconButton, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import axios from "axios";
import { owner_dashboard_delete_project } from "../../api/owner";
import { useState } from "react";

export default function OwnerRow({ row }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigation = useNavigate();
  const [currentDisplay, setDisplay] = useState("table-row");

  const handleClickRow = () => {
    localStorage.setItem("currentOwner", JSON.stringify(row));
    console.log("row id in owner row", row._id);
    navigation(`/panel/admin/single-owner/singleOwner`);
  };
  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, display: currentDisplay }}
      >
        <TableCell align="right" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell
          align="right"
          component="th"
          scope="row"
          onClick={handleClickRow}
        >
          observe
        </TableCell>
      </TableRow>
    </>
  );
}

OwnerRow.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
