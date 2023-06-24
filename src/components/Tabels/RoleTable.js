import { TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import RoleRow from "./RoleRow";

const RoleTable = ({ current, page, setPage, rowsPerPage, setRowsPerPage }) => {
  const [rows, setRows] = useState([]);
  function createData(item) {
    setRows((prv) => [
      ...prv,
      {
        entity_id: item.entity.id,
        _id: item._id,
        name: item.name,
        description: item.description,
      },
    ]);
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const headers = ["name", "description"];
  useEffect(() => {
    setRows([]);
    console.log("current in role", current);
    current.forEach((element) => {
      createData(element);
    });
  }, [current]);
  return (
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
        <RoleRow row={row} />
      ))}

      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </BaseTable>
  );
};

export default RoleTable;
