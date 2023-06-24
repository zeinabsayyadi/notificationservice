import axios from "axios";
import { useEffect, useState } from "react";
import { admin_dashboard_get_all_owners } from "../../api/admin";
import OwnersTable from "../../components/Tabels/OwnersTable";
const AllOwners = () => {
  const [owners, setOwners] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, sestRowsPerPage] = useState(5);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    console.log("token in project", token);
    axios
      .get(
        `${admin_dashboard_get_all_owners}?page=${page}&limit=${rowsPerPage}`,
        {
          headers: {
            //"Access-Control-Allow-Headers": "x-access-token",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        setOwners(res.data.data.docs);
        console.log("result in project", res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <OwnersTable
      owners={owners}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      sestRowsPerPage={sestRowsPerPage}
    />
  );
};

export default AllOwners;
