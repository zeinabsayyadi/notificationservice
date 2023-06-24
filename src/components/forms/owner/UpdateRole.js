import {
  Box,
  ButtonBase,
  CssBaseline,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  owner_dashboard_create_project_entity_role,
  owner_dashboard_update_project_entity_role,
} from "../../../api/owner";
import { userSelector } from "../../../Redux/features/UserSlice";
import { Style } from "../forms.style";
const UpdateRole = ({ current }) => {
  const theme = useTheme();
  const classes = Style(theme);
  const navigation = useNavigate();
  const role = JSON.parse(localStorage.getItem("currentRole"));
  const token = JSON.parse(localStorage.getItem("token"));
  const project = JSON.parse(localStorage.getItem("CurrentProject"));
  const schema = yup.object().shape({
    roleName: yup.string().required("role name is required"),
    description: yup.string().required("description is required"),
  });
  const handleSubmitForm = (values) => {
    console.log("values", values);
    let url = window.location;
    let entity_id = new URLSearchParams(url.search).get("entity");
    axios
      .put(
        owner_dashboard_update_project_entity_role,
        {
          name: values.roleName,
          description: values.description,
          entity_id: entity_id,
          role_id: role._id,
        },
        {
          headers: {
            "Access-Control-Allow-Headers": "x-access-token",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          console.log(res);
          navigation(
            `/panel/owner/single-projects/search?project=${project._id}`
          );
        }
      })
      .catch((err) => {
        console.log(" err", err);
      });
  };
  const formik = useFormik({
    initialValues: {
      roleName: role.name,
      description: role.description,
    },
    onSubmit: handleSubmitForm,
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
            id="roleName"
            name="roleName"
            label="role name"
            type="string"
            value={formik.values.roleName}
            onChange={formik.handleChange}
            error={formik.touched.roleName && Boolean(formik.errors.roleName)}
            helperText={formik.touched.roleName && formik.errors.roleName}
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
export default UpdateRole;
