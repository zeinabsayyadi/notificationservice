import { IconButton, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import ProjectRow from "./ProjectRow";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
const ProjectsTable = ({
  projects,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const navigaion = useNavigate();
  const [rows, setRows] = useState([]);

  function CreateProjectsRowData(item) {
    //console.log("creating a row");
    setRows((prv) => [
      ...prv,
      {
        _id: item._id,
        name: item.name,
        url: item.url,
        description: item.description,
        entities: item.entities !== undefined ? item.entities : ["null"],
      },
    ]);
  }
  useEffect(() => {
    setRows([]);
    projects?.forEach((element) => {
      CreateProjectsRowData(element);
    });
  }, [projects]);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const headers = ["name", "url", "description"];
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
          <ProjectRow row={row} />
        ))}

        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </BaseTable>
      <IconButton onClick={() => navigaion("/panel/owner/create_project")}>
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    </>
  );
};

export default ProjectsTable;
