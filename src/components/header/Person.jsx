import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useTheme } from "@mui/material";
const Person = () => {
  const theme = useTheme();
  return (
    <PersonOutlineOutlinedIcon
      sx={{
        width: "48px",
        hight: "48px",
        color: theme.palette.text.primary.main,
        [theme.breakpoints.up("md")]: {
          display: "none",
        },
        "&:hover": {
          color: theme.palette.secondary.main,
        },
      }}
    />
  );
};
export default Person;
