import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
export default function CustomTabs() {
  const theme = useTheme();
  const { t } = useTranslation();
  console.log(t("services"));
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
    <Box sx={{ width: "100%", backgroundColor: "transparent" }}>
      <Box sx={{ borderBottom: 0 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& button": {
              typography: "body1",
              borderRadius: 1,
              color: theme.palette.text.primary.main,
              padding: 0,
              textTransform: "none",
            },
            "& button:hover": {
              color: theme.palette.secondary.main,
            },
            "& button:focus": { color: theme.palette.text.secondary.main },
            //"& button:active": { backgroundColor: "green" },
          }}
        >
          <Tab
            label={t("services")}
            {...a11yProps(0)}
            sx={{
              "&.Mui-selected": {
                color: theme.palette.text.primary.main,
              },
            }}
          />
          <Tab
            label="Pricing"
            {...a11yProps(1)}
            sx={{
              "&.Mui-selected": {
                color: theme.palette.text.primary.main,
              },
            }}
          />
          <Tab
            label="Over View"
            {...a11yProps(2)}
            sx={{
              "&.Mui-selected": {
                color: theme.palette.text.primary.main,
              },
            }}
          />
          <Tab
            label="FAQs"
            {...a11yProps(3)}
            sx={{
              "&.Mui-selected": {
                color: theme.palette.text.primary.main,
              },
            }}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
