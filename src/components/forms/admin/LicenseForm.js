import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  ButtonBase,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  useTheme,
} from "@mui/material";
import {
  admin_dashboard_CreateLicense,
  admin_dashboard_get_all_services,
} from "../../../api/admin";
import { userSelector } from "../../../Redux/features/UserSlice";
import { Style } from "../forms.style";

const LicenseForm = () => {
  const user = useSelector(userSelector);
  const theme = useTheme();
  const classes = Style(theme);
  const schema = yup.object().shape({
    serviceName: yup.string().required("name is required"),
    serviceDescription: yup.string().required("description is required"),
  });

  const handleSubmitForm = (values) => {
    console.log(values);
    axios
      .post(
        `${admin_dashboard_CreateLicense}`,
        {
          name: values.serviceName,
          description: values.serviceDescription,
        },
        {
          headers: {
            "Access-Control-Allow-Headers": "x-access-token",
            "x-access-token": user?.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res === 200 || res === 201) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(" err", err);
      });
  };
  const formik = useFormik({
    initialValues: {
      serviceName: "",
      serviceDescription: "",
    },
    onSubmit: handleSubmitForm,
    validationSchema: schema,
  });

  return (
    <Box sx={classes.formBox}>
      <CssBaseline />
      <Paper elevation={3} sx={classes.formPaper}>
        <Typography variant="h6" color={theme.palette.text.primary.main}>
          Create License
        </Typography>
        <form onSubmit={formik.handleSubmit} style={classes.form}>
          <TextField
            fullWidth
            id="serviceName"
            name="serviceName"
            label="service Name"
            type="string"
            value={formik.values.serviceName}
            onChange={formik.handleChange}
            error={
              formik.touched.serviceName && Boolean(formik.errors.serviceName)
            }
            helperText={formik.touched.serviceName && formik.errors.serviceName}
            sx={classes.inputField}
          />
          <TextField
            fullWidth
            id="password"
            name="serviceDescription"
            label="service description"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={classes.inputField}
          />
          <ButtonBase sx={classes.formButton} type="submit">
            Create
          </ButtonBase>
        </form>
      </Paper>
    </Box>
  );
};
export default LicenseForm;
