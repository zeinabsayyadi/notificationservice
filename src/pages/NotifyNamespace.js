import { ButtonBase } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  owner_dashboard_get_namespace_notify_all,
  owner_dashboard_get_namespace_notify_active,
  owner_dashboard_get_namespace_notify_deactive,
} from "../api/owner";
import NameSpaceTable from "../components/Tabels/NameSpaceTable";

const NotifyNamespace = () => {
  const [namespaces, setNamespaces] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, sestRowsPerPage] = useState(5);
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    axios({
      method: "GET",
      url: `${owner_dashboard_get_namespace_notify_all}?page=${page}&limit=${rowsPerPage}`,
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      //withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setNamespaces(res?.data?.data?.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getDeactiveNamespaces = () => {
    axios({
      method: "GET",
      url: `${owner_dashboard_get_namespace_notify_deactive}?page=${page}&limit=${rowsPerPage}`,
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      //withCredentials: true,
    })
      .then((res) => {
        console.log("deactive res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getActiveNamespaces = () => {
    axios({
      method: "GET",
      url: `${owner_dashboard_get_namespace_notify_active}?page=${page}&limit=${rowsPerPage}`,
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      //withCredentials: true,
    })
      .then((res) => {
        console.log("deactive res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <ButtonBase onClick={getDeactiveNamespaces}>get deactived</ButtonBase>
      <ButtonBase onClick={getActiveNamespaces}>get actived</ButtonBase>
      {namespaces.length > 0 && (
        <NameSpaceTable
          namespaces={namespaces}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          sestRowsPerPage={sestRowsPerPage}
        />
      )}
    </>
  );
};
export default NotifyNamespace;
