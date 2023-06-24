import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { ButtonBase, Paper, useTheme } from "@mui/material";

import { admin_login } from "../../../api/admin";
import { useDispatch } from "react-redux";
import { sign } from "../../../Redux/features/UserSlice";
import { Style } from "../forms.style";
const AdminSignIn = () => {
  const theme = useTheme();
  const classes = Style(theme);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const schema = yup.object().shape({
    phone: yup.number().required("phone is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "its charachter must be more than 6"),
  });
  const handleSubmitForm = (values) => {
    axios
      .post(admin_login, {
        payload: values.phone,
        password: values.password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          const userInfo = {
            type: "admin",
            token: res.data.data,
            access_key: "",
            license_key: "",
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          dispatch(sign(userInfo));
          navigation("/");
        }
      })
      .catch((err) => {
        console.log("login err", err);
      });
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    onSubmit: handleSubmitForm,
    validationSchema: schema,
  });
  return (
    <Box sx={classes.formBox}>
      <CssBaseline />
      <Paper elevation={3} sx={classes.formPaper}>
        <Typography variant="h6" color={theme.palette.text.primary.main}>
          Sign In
        </Typography>
        <form onSubmit={formik.handleSubmit} style={classes.form}>
          <TextField
            id="phone"
            name="phone"
            label="phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={classes.inputField}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={classes.inputField}
          />
          <ButtonBase sx={classes.formButton} type="submit">
            Sign In
          </ButtonBase>
        </form>
      </Paper>
    </Box>
  );
};
export default AdminSignIn;
