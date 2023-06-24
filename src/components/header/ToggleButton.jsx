import { Box, IconButton, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
const ToggleButton = ({ setMode, mode }) => {
  const theme = useTheme();
  return (
    <>
      <IconButton
        onClick={() => {
          mode === "light" ? setMode("dark") : setMode("light");
        }}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness4Icon />
        ) : (
          <Brightness7Icon />
        )}
      </IconButton>
    </>
  );
};

export default ToggleButton;
