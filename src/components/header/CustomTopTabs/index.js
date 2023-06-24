import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const CustomTopTabs = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "transparent",
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      }}
    >
      <Box sx={{ borderBottom: 0 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },

            "& button": {
              borderRadius: 1,
              color: theme.palette.text.primary.main,
              padding: 0,
              textTransform: "none",
            },
            "& button:hover": {
              color: theme.palette.secondary.main,
            },
            "& button:focus": { color: theme.palette.text.secondary.main },
          }}
        >
          <Tab
            label="Contact us"
            {...a11yProps(0)}
            sx={{
              typography: "body1",
              "&.Mui-selected": {
                color: theme.palette.text.primary.main,
              },
            }}
          />
          <Tab
            label="My Account"
            {...a11yProps(1)}
            sx={{
              typography: "body1",
              "&.Mui-selected": {
                color: theme.palette.text.primary.main,
              },
            }}
          />
        </Tabs>
      </Box>
    </Box>
  );
};
export default CustomTopTabs;
