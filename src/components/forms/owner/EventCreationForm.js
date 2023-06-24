import { useTheme } from "@mui/system";
import { useSelector } from "react-redux";
import { Style } from "../forms.style";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import {
  Box,
  ButtonBase,
  Checkbox,
  CssBaseline,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { domSelector } from "../../../Redux/features/DomSlice";
import { owner_dashboard_send_event } from "../../../api/owner";
const EventCreationForm = ({
  setResultStatus,
  userId,
  nameSpace,
  socketId,
}) => {
  const theme = useTheme();
  const classes = Style(theme);
  const token = JSON.parse(localStorage.getItem("token"));
  const types = [
    { name: "success", val: "success" },
    { name: "warning", val: "warning" },
    { name: "error", val: "error" },
    { name: "info", val: "info" },
  ];
  const priorities = [
    { name: "low priority", val: 0 },
    { name: "mid priority", val: 1 },
    { name: "high priority", val: 2 },
  ];
  const schema = yup.object().shape({
    title: yup.string().required(),
    type: yup
      .string()
      .oneOf(["success", "warning", "error", "info"])
      .required("type is required"),
    priority: yup.number().oneOf([0, 1, 2]).required("priority is required"),
    description: yup.string().required("description is required"),
  });

  const handleSubmitForm = (values) => {
    console.log(token);
    console.log(values);
    axios({
      method: "POST",
      url: owner_dashboard_send_event,
      headers: {
        "x-access-token": token,
      },
      data: {
        user_id: userId,
        namespace: nameSpace,
        socket_id: socketId,
        title: values.title,
        icon_type: values.type,
        priority: values.priority,
        description: values.description,
      },
      //withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          setResultStatus(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      type: "info",
      priority: 0,
      description: "",
    },
    onSubmit: handleSubmitForm,

    validationSchema: schema,
  });

  return (
    <Box sx={classes.formBox}>
      <CssBaseline />
      <Paper elevation={3} sx={classes.formPaper}>
        <Typography variant="h6" color={theme.palette.text.primary.main}>
          Create Service
        </Typography>
        <form onSubmit={formik.handleSubmit} style={classes.form}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="event title"
            type="string"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={classes.inputField}
          />

          <FormControl sx={classes.formControl}>
            <InputLabel
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              icon type
            </InputLabel>
            <Select
              name="type"
              id="icon-type"
              value={formik.values.type}
              label="duration type"
              // value={selectedServices}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
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
              {types?.map((type) => (
                <MenuItem key={type.val} value={type.val}>
                  <Checkbox checked={types?.indexOf(type) > -1} />
                  <ListItemText primary={type.name} />
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
              priority
            </InputLabel>
            <Select
              name="priority"
              id="priority"
              value={formik.values.priority}
              label="priority"
              // value={selectedServices}
              onChange={formik.handleChange}
              error={formik.touched.priority && Boolean(formik.errors.priority)}
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
              {priorities?.map((type) => (
                <MenuItem key={type.val} value={type.val}>
                  <Checkbox checked={priorities?.indexOf(type) > -1} />
                  <ListItemText primary={type.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="event description"
            type="string"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
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
export default EventCreationForm;
