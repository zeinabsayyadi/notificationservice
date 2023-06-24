import {
  Box,
  ButtonBase,
  CssBaseline,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { owner_dashboard_create_project_entity } from "../../../api/owner";
import { userSelector } from "../../../Redux/features/UserSlice";
import { Style } from "../forms.style";
import { AiOutlineSisternode } from "react-icons/ai";
const CreateEntity = () => {
  const theme = useTheme();
  const navigation = useNavigate();
  const classes = Style(theme);
  const { token } = useSelector(userSelector);
  const [currentProject, setCurrentProject] = useState({});
  const schema = yup.object().shape({
    entityName: yup.string().required("entity name is required"),
    description: yup.string().required("description is required"),
  });
  useEffect(() => {
    let url = window.location;
    console.log("widows url in create entity ", url.search);
    let projectID = new URLSearchParams(url.search).get("project");
    console.log("rpject id in screate entity", projectID);
    if (url) {
      //let project = new URLSearchParams(url.search).get("project");
      setCurrentProject(projectID);
      console.log("project", projectID);
    }
  }, []);

  const handleSubmitForm = (values) => {
    console.log("values", values);
    axios
      .post(
        owner_dashboard_create_project_entity,
        {
          name: values.entityName,
          description: values.description,
          project_id: currentProject,
        },
        {
          headers: {
            "Access-Control-Allow-Headers": "x-access-token",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          navigation(
            `/panel/owner/single-projects/search?project=${currentProject}`
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const formik = useFormik({
    initialValues: {
      entityName: "",
      description: "",
    },
    onSubmit: handleSubmitForm,
    validationSchema: schema,
  });
  return (
    <Box sx={{
      display:'flex',
      width:'100vw',
      maxHeight:'90vh',
      alignItems:'center',
      justifyContent:"center"
    }}>
       <Box sx={classes.formBox}>
      <CssBaseline />
      <Paper elevation={0} sx={classes.Paper}>
      <Box sx={classes.topTypo}>
          <IconButton>
          <AiOutlineSisternode color='#E2542E' size='32px' />
          </IconButton>
          <Typography
            variant="h4"
            fontFamily='Audiowide'
            letterSpacing='50%'
            color = 'rgba(58,101,60,1)'
          >
           create entity
          </Typography>
          </Box>
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
            create
          </ButtonBase>
         
        </form>
      </Paper>
    </Box>
    </Box>
   
  );
};
export default CreateEntity;
