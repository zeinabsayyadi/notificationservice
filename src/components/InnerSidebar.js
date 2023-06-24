import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";

const InnerSidebar = (props) => {
  console.log("props", props.current);
  return (
    props.current.length > 0 && (
      <Paper>
        <List>
          <ListItem>
            <ListItemText>we are here</ListItemText>
          </ListItem>
          {props?.current?.map((layer) => (
            <ListItem key={layer._id}>
              <ListItemButton>
                <ListItemIcon>icon</ListItemIcon>
              </ListItemButton>
              <ListItemText>{layer.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Paper>
    )
  );
};
export default InnerSidebar;
