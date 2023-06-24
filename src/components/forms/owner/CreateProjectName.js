import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { ButtonBase, Paper, useTheme } from "@mui/material";
import {
  panel_owner_create_project,
  panel_owner_get_all_projects,
} from "../../../api/owner";
import { Style } from "../forms.style";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../Redux/features/projectsSlice";
import { userSelector } from "../../../Redux/features/UserSlice";

const CreateProjectName = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector(userSelector);
  const classes = Style(theme);
  const navigaion = useNavigate();
  const schema = yup.object().shape({
    Projectname: yup.string().required("name is required"),
    url: yup.string().required("url is required"),
    description: yup.string().required("description is required"),
  });
  const handleSubmitForm = (values) => {
    dispatch(setStatus({ status: false }));
    console.log("token in create project : ", token);
    axios
      .post(
        panel_owner_create_project,
        {
          name: values.Projectname,
          url: values.url,
          description: values.description,
        },
        {
          headers: {
            "Access-Control-Allow-Headers": "x-access-token",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        dispatch(setStatus({ status: true }));
        if (res.status === 200 || res.status === 201) {
          navigaion("/projects");
        }
      })
      .catch((err) => {
        console.log(" err", err);
      });
  };
  const formik = useFormik({
    initialValues: {
      Projectname: "",
      url: "",
      description: "",
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

      <Paper elevation={3} sx={classes.formPaper}>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.primary.main,
          }}
        >
          Create Project
        </Typography>
        <form onSubmit={formik.handleSubmit} style={classes.form}>
          <TextField
            fullWidth
            id="Projectname"
            name="Projectname"
            label="Project name"
            type="string"
            value={formik.values.Projectname}
            onChange={formik.handleChange}
            error={
              formik.touched.Projectname && Boolean(formik.errors.Projectname)
            }
            helperText={formik.touched.Projectname && formik.errors.Projectname}
            sx={classes.inputField}
          />
          <TextField
            fullWidth
            id="url"
            name="url"
            label="Project url"
            type="string"
            value={formik.values.url}
            onChange={formik.handleChange}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
            sx={classes.inputField}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Project description"
            type="string"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            sx={classes.inputField}
          />
          <ButtonBase type="submit" sx={classes.formButton}>
            create
          </ButtonBase>
        </form>
      </Paper>
    </Box>
  );
};
export default CreateProjectName;
