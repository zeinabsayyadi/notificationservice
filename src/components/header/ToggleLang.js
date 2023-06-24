import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import i18next from "i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLang, domSelector } from "../../Redux/features/DomSlice";
import { useTheme } from "@mui/material";

const ToggleLang = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const dom = useSelector(domSelector);
  //console.log("doooooomm", dom);
  const handleChange = (event) => {
    const dir = event.target.value === "en" ? "ltr" : "rtl";
    const local =
      event.target.value === "en"
        ? "en-US"
        : event.target.value === "fa"
        ? "fa-IR"
        : "ar-SA";
    i18next.changeLanguage(event.target.value);
    document.documentElement.setAttribute("dir", dir);
    localStorage.setItem(
      "dom",
      JSON.stringify({ lang: event.target.value, dir: dir, local: local })
    );
    dispatch(changeLang({ lang: event.target.value, dir: dir }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormControl
        variant="standard"
        sx={{
          width: "100px",
          height: " inherit",
          "& 	.MuiSelect-icon": {
            display: "none",
          },
          "& ::before": {
            display: "none",
          },
        }}
      >
        <Select
          sx={{
            color: theme.palette.text.primary.main,
            ".MuiOutlinedInput-notchedOutline": {
              borderWidth: "none",
            },
          }}
          id="demo-simple-select"
          value={dom.lang}
          onChange={handleChange}
        >
          <MenuItem value={"en"}>english</MenuItem>
          <MenuItem value={"fa"}>persian</MenuItem>
          <MenuItem value={"ar"}>arabic</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
export default ToggleLang;
