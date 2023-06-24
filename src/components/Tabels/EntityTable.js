import { TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import EntityRow from "./EntityRow";

const EntityTable = ({
  current,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const [rows, setRows] = useState([]);
  function createData(item) {
    setRows((prv) => [
      ...prv,
      {
        project_id: item?.project?._id,
        _id: item._id,
        name: item.name,
        description: item.description,
        roles: item.roles ? item.roles : [],
      },
    ]);
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const headers = ["entity", "description"];
  useEffect(() => {
    setRows([]);
    console.log("current in entity", current);
    const entities = current;
    entities?.forEach((element) => {
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
        <EntityRow row={row} />
      ))}

      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </BaseTable>
  );
};

export default EntityTable;
