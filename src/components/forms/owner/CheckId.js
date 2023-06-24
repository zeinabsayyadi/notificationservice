import { IconButton, useTheme } from "@mui/material";
import {
  ButtonBase,
  CssBaseline,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { Style } from "../forms.style";
import * as yup from "yup";
import { setStatus } from "../../../Redux/features/projectsSlice";
import axios from "axios";
import { useFormik } from "formik";
import { owner_dashboard_check_user_id } from "../../../api/owner";
import { AiOutlineSecurityScan } from "react-icons/ai";
const CheckId = ({ setUserId, setNameSpace, setSocketId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const classes = Style(theme);
  const schema = yup.object().shape({
    userId: yup.string().required("user id is required"),
    nameSpace: yup.string().required("name space id is required"),
  });
  const handleSubmitForm = (values) => {
    dispatch(setStatus({ status: false }));
    console.log("token in create project : ", token);
    axios({
      method: "POST",
      url: owner_dashboard_check_user_id,
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      data: {
        user_id: values.userId,
        namespace: values.nameSpace,
      },
      //withCredentials: true,
    })
      .then((res) => {
        dispatch(setStatus({ status: true }));
        if (res.data.status === 200) {
          console.log("res in uer id finder ", res?.data?.data?.socket_id);
          setUserId(values.userId);
          setNameSpace(values.nameSpace);
          setSocketId(res?.data?.data?.socket_id);
        }
      })
      .catch((err) => {
        console.log(" err", err);
      });
  };
  const formik = useFormik({
    initialValues: {
      userId: "",
      nameSpace: "",
    },
    onSubmit: handleSubmitForm,
    onChange: () => {
      //console.log("change");
    },
    validationSchema: schema,
  });

  return (
    <Box sx={classes.formBox}>
      <CssBaseline />

      <Paper elevation={0} sx={classes.Paper}>
      <Box sx={classes.topTypo}>
          <IconButton>
          <AiOutlineSecurityScan color='#E2542E' size='32px' />
          </IconButton>
          <Typography
            variant="h4"
            fontFamily='Audiowide'
            letterSpacing='50%'
            color = 'rgba(58,101,60,1)'
           
          >
           find user
          </Typography>
          </Box>
        <form onSubmit={formik.handleSubmit} style={classes.form}>
          <TextField
            fullWidth
            id="userId"
            name="userId"
            label="user Id"
            type="string"
            value={formik.values.userId}
            onChange={formik.handleChange}
            error={formik.touched.userId && Boolean(formik.errors.userId)}
            helperText={formik.touched.userId && formik.errors.userId}
            sx={classes.inputField}
          />
          <TextField
            fullWidth
            id="nameSpace"
            name="nameSpace"
            label="name space"
            type="string"
            value={formik.values.nameSpace}
            onChange={formik.handleChange}
            error={formik.touched.nameSpace && Boolean(formik.errors.nameSpace)}
            helperText={formik.touched.nameSpace && formik.errors.nameSpace}
            sx={classes.inputField}
          />
          <ButtonBase type="submit" sx={classes.formButton}>
            check
          </ButtonBase>
        </form>
      </Paper>
    </Box>
  );
};
export default CheckId;
