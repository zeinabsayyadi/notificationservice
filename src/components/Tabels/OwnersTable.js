import { IconButton, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseTable from "./BaseTable";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import OwnerRow from "./OwnerRow";
const OwnersTable = ({
  owners,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const navigaion = useNavigate();
  const [rows, setRows] = useState([]);

  function CreateownersRowData(item) {
    //console.log("creating a row");
    setRows((prv) => [
      ...prv,
      {
        _id: item._id,
        name: item.name,
      },
    ]);
  }
  useEffect(() => {
    setRows([{ name: "zeinab", _id: "1" }]);
    owners?.forEach((element) => {
      CreateownersRowData(element);
    });
  }, [owners]);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const headers = ["name", "details"];
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
        {(rows > 0
          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : rows
        ).map((row) => (
          <OwnerRow row={row} />
        ))}

        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </BaseTable>
    </>
  );
};
export default OwnersTable;
