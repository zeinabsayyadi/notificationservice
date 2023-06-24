import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import * as React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PolylineOutlinedIcon from "@mui/icons-material/PolylineOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import { clearState, userSelector } from "../../Redux/features/UserSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import Style from "./SidePanel.style";
const SidePanel = ({
  drawerWidth,
  setMobileOpen,
  mobileOpen,
  setMode,
  mode,
}) => {
  const theme = useTheme();
  const classes = Style(theme);
  const { type } = useSelector(userSelector);
  console.log("type in sidebar : ", type);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const sideEnchore = theme.direction === "ltr" ? "right" : "left";
  const { t, i18n } = useTranslation();
  const windowSize = window.innerWidth;
  const container =
    windowSize !== undefined ? () => window.document.body : undefined;
  const [openServiceCollapse, setOpenSErviceCollapse] = useState(false);
  const [openNamespaceCollaps, setOpenNamespaceCollaps] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const userSignOut = () => {
    dispatch(clearState);
    navigation("/");
  };
  const SideLists = () => {
    return (
      type && (
        <>
          <Toolbar position="relative" />
          <Box sx={classes.listWrapper}>
            <ListItem disablePadding>
              <ListItemButton sx={classes.listButton}>
                <ListItemIcon>
                  <PersonOutlineRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  color={theme.palette.text.primary.main}
                />
              </ListItemButton>
            </ListItem>
            <Divider
              sx={{
                marginTop: "4rem",
              }}
            />

            {type === "admin" ? (
              <List>
                {["create service", "create license", "all owners","pricing"].map(
                  (text, index) => (
                    <NavLink
                      to={`/panel/admin/${text.replaceAll(" ", "_")}`}
                      key={text}
                    >
                      <ListItem key={text} disablePadding sx={classes.listItem}>
                        <ListItemButton sx={classes.listButton}>
                          <ListItemIcon>
                            {index % 3 === 0 ? (
                              <InboxIcon />
                            ) : index % 3 === 1 ? (
                              <MailIcon />
                            ) : (
                              <InboxIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={text}
                            color={theme.palette.text.primary.main}
                          />
                        </ListItemButton>
                      </ListItem>
                    </NavLink>
                  )
                )}
                <ListItem disablePadding sx={classes.listItem}>
                  <ListItemButton sx={classes.listButton}>
                    <ListItemIcon>
                      {theme.palette.mode === "dark" ? (
                        <Brightness4Icon />
                      ) : (
                        <Brightness7Icon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={mode}
                      color={theme.palette.text.primary.main}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider
                  sx={{
                    marginBottom: "4rem",
                  }}
                />
                <ListItem disablePadding sx={classes.listItem}>
                  <ListItemButton onClick={userSignOut} sx={classes.listButton}>
                    <ListItemIcon>
                      <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Sign Out"
                      color={theme.palette.text.primary.main}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            ) : type === "owner" ? (
              <List>
                {["create project", "projects", "notifications", "events","pricing"].map(
                  (text, index) => (
                    <NavLink
                      to={`/panel/owner/${text.replaceAll(" ", "_")}`}
                      key={text}
                    >
                      <ListItem key={text} disablePadding sx={classes.listItem}>
                        <ListItemButton sx={classes.listButton}>
                          <ListItemIcon>
                            {index % 3 === 0 ? (
                              <CreateOutlinedIcon />
                            ) : index % 3 === 1 ? (
                              <SettingsSuggestOutlinedIcon />
                            ) : (
                              <NotificationsOutlinedIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={text}
                            color={theme.palette.text.primary.main}
                          />
                        </ListItemButton>
                      </ListItem>
                    </NavLink>
                  )
                )}
                <ListItem
                  key="services"
                  disablePadding
                  className={classes.listItem}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <ListItemButton
                      onClick={() =>
                        setOpenNamespaceCollaps(!openNamespaceCollaps)
                      }
                      sx={classes.listButton}
                    >
                      <ListItemIcon>
                        <RoomServiceOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="namespaces"
                        color={theme.palette.text.primary.main}
                      />
                    </ListItemButton>
                    <Collapse
                      in={openNamespaceCollaps}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List
                        component="div"
                        sx={{
                          paddingLeft: "0.8rem",
                        }}
                      >
                        <ListItem disablePadding sx={classes.listItem}>
                          <ListItemButton
                            sx={classes.listButton}
                            onClick={() =>
                              navigation("/panel/owner/event/namespace")
                            }
                          >
                            <ListItemIcon>
                              <PolylineOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="event namespace" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={classes.listItem}>
                          <ListItemButton
                            sx={classes.listButton}
                            onClick={() =>
                              navigation("/panel/owner/notify/namespace")
                            }
                          >
                            <ListItemIcon>
                              <AddAlertOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="notify namespace" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Collapse>

                    <ListItemButton
                      onClick={() =>
                        setOpenSErviceCollapse(!openServiceCollapse)
                      }
                      sx={classes.listButton}
                    >
                      <ListItemIcon>
                        <RoomServiceOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="services"
                        color={theme.palette.text.primary.main}
                      />
                    </ListItemButton>
                    <Collapse
                      in={openServiceCollapse}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List
                        component="div"
                        sx={{
                          paddingLeft: "0.8rem",
                        }}
                      >
                        <ListItem disablePadding sx={classes.listItem}>
                          <ListItemButton
                            sx={classes.listButton}
                            onClick={() =>
                              navigation("/panel/owner/create/namespace/event")
                            }
                          >
                            <ListItemIcon>
                              <PolylineOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="create event namespace" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={classes.listItem}>
                          <ListItemButton
                            sx={classes.listButton}
                            onClick={() =>
                              navigation("/panel/owner/create/event")
                            }
                          >
                            <ListItemIcon>
                              <AddAlertOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText> create event</ListItemText>
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={classes.listItem}>
                          <ListItemButton
                            sx={classes.listButton}
                            onClick={() =>
                              navigation("/panel/owner/create/namespace/notify")
                            }
                          >
                            <ListItemIcon>
                              <PolylineOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="create notify namespace" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={classes.listItem}>
                          <ListItemButton
                            sx={classes.listButton}
                            onClick={() =>
                              navigation("/panel/owner/create/notify")
                            }
                          >
                            <ListItemIcon>
                              <AddAlertOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText> create notify</ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Collapse>
                  </Box>
                </ListItem>

                <ListItem disablePadding sx={classes.listItem}>
                  <ListItemButton
                    sx={classes.listButton}
                    onClick={() => {
                      mode === "light" ? setMode("dark") : setMode("light");
                    }}
                  >
                    <ListItemIcon>
                      {theme.palette.mode === "dark" ? (
                        <Brightness4Icon />
                      ) : (
                        <Brightness7Icon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={mode}
                      color={theme.palette.text.primary.main}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider
                  sx={{
                    marginBottom: "4rem",
                  }}
                />
                <ListItem disablePadding sx={classes.listItem}>
                  <ListItemButton onClick={userSignOut} sx={classes.listButton}>
                    <ListItemIcon>
                      <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Sign Out"
                      color={theme.palette.text.primary.main}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            ) : (
              <></>
            )}
          </Box>
        </>
      )
    );
  };
  return (
    type && (
      <>
        <Drawer
          elevation={2}
          container={container}
          anchor={sideEnchore}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <SideLists />
        </Drawer>
        <Drawer
          variant="permanent"
          anchor={sideEnchore}
          open={!mobileOpen}
          sx={{
            display: { xs: "none", md: "block" },
            width: drawerWidth,
            flexShrink: 0,
            marginRight: 0,
            [theme.breakpoints.down("xs")]: {
              display: "none",
            },

            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: theme.palette.background.paper,
            },
            "& .MuiBackdrop-root": {
              display: "none",
            },
          }}
        >
          <SideLists />
        </Drawer>
      </>
    )
  );
};
export default SidePanel;
