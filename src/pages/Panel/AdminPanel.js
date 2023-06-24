import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { userSelector } from "../../Redux/features/UserSlice";
import Landing from "../Landing";

const AdminPanel = () => {
  const { token, type } = useSelector(userSelector);

  return 
  //token && type === "admin" ?
   //(
    <>
      <Box
        width="100%"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2">welcom to panel</Typography>
      </Box>
      <Paper
        elevation={3}
        sx={{
          margin: "1.5rem",
          minHeight: "30rem",
          display: "flex",
        }}
      ></Paper>
    </>
  //) : (
    //<Landing />
  //);
};
export default AdminPanel;
