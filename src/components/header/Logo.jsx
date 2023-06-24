import { Box } from "@mui/material";
import logo from "../../assets/img/logo.svg";
import logoDark from "../../assets/img/logoDark.svg";
const Logo = ({ mode }) => {
  return (
    <>
      {mode === "light" ? (
        <Box
          component="img"
          sx={{
            marginX: "2rem",
            height: 70,
            width: 70,
            backgroundColor: "transparent",
          }}
          src={logoDark}
          alt="dident load"
        />
      ) : (
        <Box
          component="img"
          sx={{
            marginX: "2rem",
            height: 56,
            width: 56,
            backgroundColor: "transparent",
          }}
          src={logo}
          alt="dident load"
        />
      )}
    </>
  );
};
export default Logo;
