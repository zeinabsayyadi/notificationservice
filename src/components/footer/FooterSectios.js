import { Box, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

const FooterSections = ({ title, items }) => {
  const theme = useTheme();

  return (
    <Box
      item
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& a": {
          color: theme.palette.text.primary.bgdark,
          textDecoration: "none",
          marginBottom: "1rem",
          typography: "body2",
          "&:hover": {
            color: theme.palette.secondary.main,
          },
          "&:active": {
            color: theme.palette.text.secondary.main,
          },
        },
      }}
      xs={12}
      sm={4}
    >
      <Typography
        sx={{
          marginBottom: "2rem",
          typography: "body1",
        }}
      >
        {title}
      </Typography>
      {items.map((item) => (
        <NavLink
          to={`/${item.replaceAll(" ", "_")}`}
          key={item.toString()}
          style={{ color: theme.palette.text.primary.main }}
        >
          {item}
        </NavLink>
      ))}
    </Box>
  );
};
export default FooterSections;
