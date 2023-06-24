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
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { owner_dashboard_create_project_entity_role } from "../../../api/owner";
import { userSelector } from "../../../Redux/features/UserSlice";
import { Style } from "../forms.style";
const CreateRole = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = Style(theme);
  const { token } = useSelector(userSelector);
  const entityId = JSON.parse(localStorage.getItem("entityId"));
  const project = JSON.parse(localStorage.getItem("CurrentProject"));
  const schema = yup.object().shape({
    roleName: yup.string().required("role name is required"),
    description: yup.string().required("description is required"),
  });
  const handleSubmitForm = (values) => {
    console.log("values", values);
    console.log("entity id in role", entityId);
    axios
      .post(
        owner_dashboard_create_project_entity_role,
        {
          name: values.roleName,
          description: values.description,
          entity_id: entityId,
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
          navigate(`/panel/owner/single-entity/search?entity=${entityId}`);
        }
      })
      .catch((err) => {
        console.log("role err", err);
      });
  };
  const formik = useFormik({
    initialValues: {
      roleName: "",
      description: "",
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
          Create Role
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
export default CreateRole;
