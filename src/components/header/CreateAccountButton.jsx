import { ButtonBase, useTheme } from "@mui/material";

const CreateAccountButton = () => {
  const theme = useTheme();
  return (
    <ButtonBase
      sx={{
        minWidth: "max-content",
        color: theme.palette.text.primary.main,
        // backgroundColor:theme.palette.background.tableTwo,
        padding: "0.5rem",
        borderRadius: "0.25rem",
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      }}
    >
      creat a Notify account
    </ButtonBase>
  );
};
export default CreateAccountButton;
