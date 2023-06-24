import { Box, Grid, useTheme } from "@mui/material";
import React from "react";
import FooterSections from "./FooterSectios";
const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      sx={{
        marginBottom: 0,
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          backgroundColor: theme.palette.background.paper,
          position: "relative",
        }}
      >
        <Grid item xs={12} sm={4}>
          <FooterSections
            title={`About Us`}
            items={["Aim", "Vision", "Testimonials"]}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FooterSections
            title={`Services`}
            items={["service 1", "service 2", "service 3"]}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FooterSections
            title={`Social Media`}
            items={["Facebook", "Instagram", "Twitter", "Youtube"]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Footer;
