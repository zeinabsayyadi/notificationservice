import { useTheme } from "@mui/material";
import { ButtonBase, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/features/UserSlice";
import Landing from "../Landing";

const OwnerPanel = () => {
  const theme = useTheme();
  const { type, token } = useSelector(userSelector);
  console.log("hey owner panel");
  return token && type === "owner" ? (
    <Paper
      sx={{
        width: "100vw",
        hight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1" color={theme.palette.text.primary.main}>
          wellcome to panel
        </Typography>
      </Box>
      <Box>
        <ButtonBase>chek out your last activities</ButtonBase>
        <ButtonBase></ButtonBase>
      </Box>
    </Paper>
  ) : (
    <Landing />
  );
};
export default OwnerPanel;
