import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import  PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import { useState } from "react";
import OwnerProfile from "../components/OwnerProfile";
import OwnerProjects from "../components/OwnerProjects";
import OwnerLicenses from "../components/OwnerLicense";
import OwnerActivity from "../components/OwnerActivity";
const SingleOwner = () => {
  const [currentView,setCurrentView] = useState(0);
  return (
    <Box
      sx={{
        marginY: "3rem",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          width: "20%",
          height: "80vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <List>
          <ListItem>
            <ListItemButton onClick={()=>setCurrentView(0)}>
              <ListItemIcon>
              <PersonOutlineRoundedIcon/>
              </ListItemIcon>
              <ListItemText>
                owner profile 
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemButton
              onClick={()=>setCurrentView(1)}
            >
              <ListItemIcon>
              <SettingsSuggestOutlinedIcon/>
              </ListItemIcon>
              <ListItemText>Projects</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={()=>setCurrentView(2)}>
              <ListItemIcon>
              <CreditScoreOutlinedIcon/>
              </ListItemIcon>
              <ListItemText>licenses</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disable>
            <ListItemButton onClick={()=>setCurrentView(3)}>
              <ListItemIcon>
                <EqualizerRoundedIcon/>
              </ListItemIcon>
              <ListItemText>activities</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider orientation="vertical" flexItem></Divider>
      </Box>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper elevation={3}>
          {currentView === 0 ? <OwnerProfile />:
          currentView === 1 ? <OwnerProjects />
          : currentView === 2 ? <OwnerLicenses/>:
          currentView === 3 ? <OwnerActivity/> :<></>}
        </Paper>
      </Box>
    </Box>
  );
};
export default SingleOwner;
