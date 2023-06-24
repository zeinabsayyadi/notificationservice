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
import { owner_dashboard_create_notif } from "../../../api/owner";
const CreateNotify = () => {
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
    subject: yup.string().required("subject is required"),
    namespace: yup.string().required("subject is required"),
    priority: yup.number().oneOf([0, 1, 2]).required("priority is required"),
    body: yup.string().required("description is required"),
  });

  const handleSubmitForm = (values) => {
    console.log(token);
    console.log(values);
    axios({
      method: "POST",
      url: owner_dashboard_create_notif,
      headers: {
        "x-access-token": token,
      },
      data: {
        namespace: values.namespace,
        subject: values.subject,
        priority: values.priority,
        body: values.body,
      },
      //withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const formik = useFormik({
    initialValues: {
      subject: "",
      body: "",
      priority: 0,
      namespace: "",
    },
    onSubmit: handleSubmitForm,

    validationSchema: schema,
  });

  return (
    <Box sx={classes.formBox}>
      <CssBaseline />
      <Paper elevation={3} sx={classes.formPaper}>
        <Typography variant="h6" color={theme.palette.text.primary.main}>
          Create notify
        </Typography>
        <form onSubmit={formik.handleSubmit} style={classes.form}>
          <TextField
            fullWidth
            id="subject"
            name="subject"
            label="event subject"
            type="string"
            value={formik.values.subject}
            onChange={formik.handleChange}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
            sx={classes.inputField}
          />
          <TextField
            fullWidth
            id="namespace"
            name="namespace"
            label="event namespace"
            type="string"
            value={formik.values.namespace}
            onChange={formik.handleChange}
            error={formik.touched.namespace && Boolean(formik.errors.namespace)}
            helperText={formik.touched.namespace && formik.errors.namespace}
            sx={classes.inputField}
          />
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
            id="body"
            name="body"
            label="event body"
            type="string"
            value={formik.values.body}
            onChange={formik.handleChange}
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
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
export default CreateNotify;
