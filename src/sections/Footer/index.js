import { Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import linkedin from "../../assets/img/linkedin.svg";
import { Box } from "@mui/system";
const Footer = () => {
  const theme = useTheme();
  return (
    <Paper elevation={2} backgroundColor={theme.palette.background.default}>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item>
          <Typography color={theme.palette.text.secondary.dark}>
            notification system for your business
          </Typography>
        </Grid>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton aria-label="contact us">
              <MailOutlineRoundedIcon />
            </IconButton>
            <Box
              component="img"
              sx={{
                height: 20,
                width: 20,
                backgroundColor: "transparent",
                "& .path": {
                  fill: "blue",
                },
              }}
              src={linkedin}
              alt="dident load"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Footer;
