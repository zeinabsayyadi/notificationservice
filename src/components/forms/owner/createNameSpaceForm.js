import { useNavigate } from "react-router-dom";
import {
  Box,
  ButtonBase,
  Checkbox,
  CssBaseline,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Style } from "../forms.style";
import { useEffect, useState } from "react";
import ClipboardJS from "clipboard";
import {AiOutlinePullRequest} from "react-icons/ai";
import {
  owner_dashboard_create_name_space_get_entities,
  owner_dashboard_create_name_space_get_projects,
  owner_dashboard_create_name_space_get_role,
} from "../../../api/owner";
const CreateNameSpaceForm = ({ namespaceRout }) => {
  const theme = useTheme();
  const classes = Style(theme);
  const navigaion = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [projects, setProjects] = useState([]);
  const [projectDisable, setProjectDisable] = useState(true);
  const [entities, setEntities] = useState([]);
  const [entityDisable, setEntitytDisable] = useState(true);
  const [roleDisable, setRoletDisable] = useState(true);
  const [currentProject, setCurrentproject] = useState(null);
  const [currentEntity, setCurrentEntity] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [nameSpace, setNameSpace] = useState(null);
  new ClipboardJS("#copied");
  const schema = yup.object().shape({
    project: yup.string().required("project name is requierd"),
    entity: yup.string().required("entity name is requierd"),
    role: yup.string().required("role name is requierd"),
  });

  useEffect(() => {
    console.log("whaaat");
    axios
      .get(owner_dashboard_create_name_space_get_projects, {
        headers: {
          "Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        setProjects(res.data.data);
        setProjectDisable(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const getEntities = (project_id) => {
    console.log("token", token);
    setCurrentproject(project_id);
    axios({
      method: "POST",
      url: owner_dashboard_create_name_space_get_entities,
      headers: {
        "x-access-token": token,
      },
      data: {
        project_id: project_id,
      },
    })
      .then((res) => {
        console.log("res of entitys", res?.data?.data);
        setEntities(res?.data?.data);
        setEntitytDisable(false);
      })
      .catch((err) => {
        console.log("err in get eentity", err);
      });
  };
  const getRoles = (entity_id) => {
    console.log("token", token);
    setCurrentEntity(entity_id);
    axios({
      method: "POST",
      url: owner_dashboard_create_name_space_get_role,
      headers: {
        "x-access-token": token,
      },
      data: {
        project_id: currentProject,
        entity_id: entity_id,
      },
    })
      .then((res) => {
        console.log("res of entitys", res?.data?.data);
        setRoles(res?.data?.data);
        setRoletDisable(false);
      })
      .catch((err) => {
        console.log("err in get eentity", err);
      });
  };

  const handleSubmitForm = () => {
    axios({
      method: "POST",
      url: namespaceRout,
      headers: {
        "x-access-token": token,
      },
      data: {
        project_id: currentProject,
        entity_id: currentEntity,
        role_id: currentRole,
      },
    })
      .then((res) => {
        console.log("res of entitys", res);
        const str = res.data.data.namespace;
        const newe = str.replace(/\s/g, "");
        console.log(newe);
        setNameSpace(newe);
      })
      .catch((err) => {
        console.log("err in get eentity", err);
      });
  };
  const formik = useFormik({
    initialValues: {
      project: "",
      entity: "",
      role: "",
    },
    onSubmit: handleSubmitForm,
    onChange: () => {
      console.log("change");
    },
    validationSchema: schema,
  });
  return (
    <Box
    sx={{
      display:'flex',
      width:'100vw',
      maxHeight:'90vh',
      alignItems:'center',
      justifyContent:'center'
    }}
    >
         <Box sx={classes.formBox}>
      <CssBaseline />
      <Paper elevation={0} sx={classes.formPaper}>
      <Box sx={classes.topTypo}>
          <IconButton>
          <AiOutlinePullRequest color='#E2542E' size='32px' />
          </IconButton>
          <Typography
            variant="h4"
            fontFamily='Audiowide'
            letterSpacing='50%'
            color = 'rgba(58,101,60,1)'
          >
           request namespace
          </Typography>
          </Box>
        <form onSubmit={formik.handleSubmit} style={classes.form}>
          <FormControl sx={classes.formControl}>
            <InputLabel
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              project
            </InputLabel>
            <Select
              disabled={projectDisable}
              name="project"
              id="project"
              value={formik.values.project}
              label="project"
              // value={selectedServices}
              onChange={formik.handleChange}
              error={formik.touched.project && Boolean(formik.errors.project)}
              sx={classes.selsectField}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "15px",
                    color: theme.palette.text.primary.main,
                    "& svg": {
                      display: "none",
                    },
                  },
                },
              }}
            >
              {projects.length > 0 &&
                projects?.map((project) => (
                  <MenuItem
                    key={project._id}
                    value={project._id}
                    onClick={() => getEntities(project._id)}
                  >
                    <Checkbox checked={projects?.indexOf(project.name) > -1} />
                    <ListItemText primary={project.name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={classes.formControl}>
            <InputLabel
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              entity
            </InputLabel>
            <Select
              disabled={entityDisable}
              name="entity"
              id="entity"
              value={formik.values.entity}
              label="entity"
              // value={selectedServices}
              onChange={formik.handleChange}
              error={formik.touched.entity && Boolean(formik.errors.entity)}
              sx={classes.selsectField}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "15px",
                    color: theme.palette.text.primary.main,
                    "& svg": {
                      display: "none",
                    },
                  },
                },
              }}
            >
              {entities.length > 0 &&
                entities?.map((entity) => (
                  <MenuItem
                    key={entity._id}
                    value={entity._id}
                    onClick={() => getRoles(entity._id)}
                  >
                    <Checkbox checked={entities?.indexOf(entity.name) > -1} />
                    <ListItemText primary={entity.name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={classes.formControl}>
            <InputLabel
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              role
            </InputLabel>
            <Select
              disabled={roleDisable}
              name="role"
              id="role"
              value={formik.values.role}
              label="role"
              // value={selectedServices}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              sx={classes.selsectField}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "15px",
                    color: theme.palette.text.primary.main,
                    "& svg": {
                      display: "none",
                    },
                  },
                },
              }}
            >
              {roles.length > 0 &&
                roles?.map((role) => (
                  <MenuItem
                    key={role._id}
                    value={role._id}
                    onClick={() => setCurrentRole(role._id)}
                  >
                    <Checkbox checked={roles?.indexOf(role.name) > -1} />
                    <ListItemText primary={role.name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <ButtonBase sx={classes.formButton} type="submit">
            request
          </ButtonBase>
        </form>
        {nameSpace && (
          <>
            <Typography id="input">{nameSpace}</Typography>
            <button
              className="button"
              id="copied"
              data-clipboard-action="copy"
              data-clipboard-target="#input"
            >
              Copy To Clipboard
            </button>
          </>
        )}
      </Paper>
    </Box>
    </Box>
 
  );
};
export default CreateNameSpaceForm;
