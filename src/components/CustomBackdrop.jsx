import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
const CustomBackdrop = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Backdrop
      sx={{ color: "red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
export default CustomBackdrop;
