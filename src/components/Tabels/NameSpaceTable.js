import { IconButton, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
import NamespaceRow from "./NamespaceRow";
const NameSpaceTable = ({
  namespaces,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const navigaion = useNavigate();
  const [rows, setRows] = useState([]);
  function CreateProjectsRowData(item) {
    setRows((prv) => [
      ...prv,
      {
        _id: item._id,
        name: item.namespace,
        project: item.project[0],
        entity: item.entity[0],
        role: item.role[0],
        isEnable: item?.isEnable || true,
      },
    ]);
  }
  useEffect(() => {
    setRows([]);
    namespaces.forEach((element) => {
      CreateProjectsRowData(element);
    });
  }, [namespaces]);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const headers = ["name", "project", "entity", "role", "enable"];
  return (
    <>
      <BaseTable
        rows={rows}
        headers={headers}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      >
        {(rowsPerPage > 0
          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : rows
        ).map((row) => (
          <NamespaceRow row={row} />
        ))}

        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </BaseTable>
      <IconButton onClick={() => navigaion("/panel/owner/create-name-space")}>
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    </>
  );
};
export default NameSpaceTable;
