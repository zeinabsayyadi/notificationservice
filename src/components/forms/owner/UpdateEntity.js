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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  owner_dashboard_create_project_entity,
  owner_dashboard_update_project_entity,
} from "../../../api/owner";
import {
  projectsSelector,
  setStatus,
} from "../../../Redux/features/projectsSlice";
import { userSelector } from "../../../Redux/features/UserSlice";
import { Style } from "../forms.style";
const UpdateEntity = () => {
  const theme = useTheme();
  const classes = Style(theme);
  const entity = JSON.parse(localStorage.getItem("entity"));
  const dispatch = useDispatch();
  const { token } = useSelector(userSelector);
  const navigation = useNavigate();
  const schema = yup.object().shape({
    entityName: yup.string().required("entity name is required"),
    description: yup.string().required("description is required"),
  });
  const handleSubmitForm = (values) => {
    dispatch(setStatus({ status: false }));

    axios
      .put(
        owner_dashboard_update_project_entity,
        {
          name: values.entityName,
          description: values.description,
          project_id: entity.project_id,
          entity_id: entity._id,
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
        navigation(`/panel/owner/single-projects/${entity.project_id}}`);
        console.log(" update entity", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const formik = useFormik({
    initialValues: {
      entityName: entity.name,
      description: entity.description,
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
          Update Entity
        </Typography>
        <form onSubmit={formik.handleSubmit} style={classes.form}>
          <TextField
            fullWidth
            id="entityName"
            name="entityName"
            label="entity name"
            type="string"
            value={formik.values.entityName}
            onChange={formik.handleChange}
            error={
              formik.touched.entityName && Boolean(formik.errors.entityName)
            }
            helperText={formik.touched.entityName && formik.errors.entityName}
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
            update
          </ButtonBase>
        </form>
      </Paper>
    </Box>
  );
};
export default UpdateEntity;
