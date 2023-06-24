import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { owner_dashboard_get_event_all } from "../api/owner";
import EventsTable from "../components/Tabels/EventsTable";
const Events = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, sestRowsPerPage] = useState(5);
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    console.log("token in event", token);
    axios
      .get(
        `${owner_dashboard_get_event_all}?page=${page}&limit=${rowsPerPage}`,
        {
          headers: {
            //"Access-Control-Allow-Headers": "x-access-token",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        setEvents(res.data.data.docs);
        console.log("result in events", res.data);
      })
      .catch((err) => console.log("err in events", err));
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "3rem",
      }}
    >
      <Typography>events</Typography>
      <EventsTable
        events={events}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        sestRowsPerPage={sestRowsPerPage}
      />
    </Box>
  );
};
export default Events;
