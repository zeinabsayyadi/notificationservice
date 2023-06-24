import { Box, Paper, useTheme } from "@mui/material";
import { useState } from "react";
import Header from "../sections/Header";
import { useSelector } from "react-redux";
import { userSelector } from "../Redux/features/UserSlice";
import SidePanel from "../components/SidePanel";
const Layout = ({ children, setMode, mode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const { type } = useSelector(userSelector);
  const drawerWidth = type ? "240px" : 0;
  const dir = theme.direction === "rtl";
  const marginl = dir ? (window.innerWidth > 992 ? drawerWidth : "0px") : "0px";
  const marginR = !dir
    ? window.innerWidth > 992
      ? drawerWidth
      : "0px"
    : "0px";
  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box width={drawerWidth} sx={{ backgroundColor: "inherit" }}>
        <SidePanel
          drawerWidth={drawerWidth}
          setMobileOpen={setMobileOpen}
          mobileOpen={mobileOpen}
          mode={mode}
          setMode={setMode}
        />
      </Box>
      <Box
        marginLeft={marginl}
        marginRight={marginR}
        sx={{ backgroundColor: "inherit" }}
      >
        <Header
          setMode={setMode}
          mode={mode}
          setMobileOpen={setMobileOpen}
          mobileOpen={mobileOpen}
        />
        <Box minHeight="90vh">{children}</Box>
      </Box>
    </Paper>
  );
};
export default Layout;
