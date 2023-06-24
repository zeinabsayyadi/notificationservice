import {
  AppBar,
  Box,
  ButtonBase,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Logo from "../../components/header/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleLang from "../../components/header/ToggleLang";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/features/UserSlice";
import { useTranslation } from "react-i18next";
const Header = ({ mode, setMobileOpen, mobileOpen }) => {
  const theme = useTheme();
  const { type } = useSelector(userSelector);
  const token = JSON.parse(localStorage?.getItem('token'))
  const { t } = useTranslation();
  console.log("type in header ", type);
  return (
    
    token &&  <AppBar
        position="sticky"
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.palette.background.paper,
          backgroundImage: "none",
          paddingY: "1rem",
          paddingX: "2rem",
          margin: 0,
        }}
      >
        <Grid container direction="column" alignItems="stretch">
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Grid
              item
              sx={{
                display: window.innerWidth > 992 ? "none" : "block",
              }}
            >
              <ButtonBase
                sx={{
                  display:
                    window.innerWidth > 992 || type === null ? "none" : "block",
                }}
                onClick={(e) => setMobileOpen(!mobileOpen)}
              >
                <MenuIcon
                  sx={{
                    color: theme.palette.text.primary.main,
                    "&:hover": {
                      color: theme.palette.secondary.main,
                    },
                  }}
                />
              </ButtonBase>
            </Grid>
            <Grid item>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Logo mode={mode} />

                <Typography
                  variant="h6"
                  color={theme.palette.text.primary.main}
                >
                  {t("welcom")}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ToggleLang />
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    
  );
};
export default Header;
