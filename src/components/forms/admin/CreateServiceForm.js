import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  ButtonBase,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
} from "@mui/material";
import { admin_dashboard_Create_service } from "../../../api/admin";
import { useTheme } from "@mui/material";
import { userSelector } from "../../../Redux/features/UserSlice";
import { useSelector } from "react-redux";
import { Style } from "../forms.style";
import { domSelector } from "../../../Redux/features/DomSlice";
import { useState } from "react";

const CreateServiceForm = ({ servicesList }) => {
  //start
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  //end
  console.log("services here", servicesList);
  const theme = useTheme();
  const classes = Style(theme);
  const { token } = useSelector(userSelector);
  const schema = yup.object().shape({
    services: yup.array().required("name is required"),
    name: yup.string().required(),
    price: yup.string().required("price is required"),
    durationLength: yup
      .number()
      .min(1)
      .required("length of duration is required"),
    type: yup.number().oneOf([1, 2, 3]).required(),
    description: yup.string().required("description is required"),
  });

  const handleSubmitForm = (values) => {
    console.log(token);
    console.log(values);
    axios
      .post(
        admin_dashboard_Create_service,
        {
          services: values.services,
          name: values.name,
          price: values.price,
          length: values.durationLength,
          type: values.type,
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
        console.log(res);
        if (res === 200 || res === 201) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const formik = useFormik({
    initialValues: {
      services: [],
      name: "",
      price: "",
      durationLength: null,
      type: 1,
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
            id="name"
            name="name"
            label="service name"
            type="string"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={classes.inputField}
          />
          <FormControl sx={classes.formControl}>
            <InputLabel
              sx={{
                textAlign:
                  useSelector(domSelector).dir === "rtl" ? "right" : "left",
                color: theme.palette.text.primary,
              }}
            >
              services
            </InputLabel>
            <Select
              id="services"
              name="services"
              label="services"
              type="string"
              value={formik.values.services}
              onChange={formik.handleChange}
              error={formik.touched.services && Boolean(formik.errors.services)}
              helperText={formik.touched.services && formik.errors.services}
              multiple
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
              {servicesList.length > 0 ? (
                servicesList?.map((service) => (
                  <MenuItem key={service._id} value={service._id}>
                    <Checkbox
                      checked={servicesList?.indexOf(service.name) > -1}
                    />
                    <ListItemText primary={service.name} />
                  </MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
          {/* <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <TextField
            fullWidth
            id="price"
            name="price"
            label="service price"
            type="string"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            sx={classes.inputField}
          />
          <TextField
            fullWidth
            id="durationLength"
            name="durationLength"
            label="service duration length"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 365 } }}
            value={formik.values.durationLength}
            onChange={formik.handleChange}
            error={
              formik.touched.durationLength &&
              Boolean(formik.errors.durationLength)
            }
            helperText={
              formik.touched.durationLength && formik.errors.durationLength
            }
            sx={classes.inputField}
          />
          <FormControl sx={classes.formControl}>
            <InputLabel
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              duration type
            </InputLabel>
            <Select
              name="type"
              id="duration-type"
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
              {[
                { name: "day", val: 1 },
                { name: "month", val: 2 },
                { name: "year", val: 3 },
              ].map((type) => (
                <MenuItem key={type.val} value={type.val}>
                  <Checkbox
                    checked={
                      [
                        { name: "day", val: 1 },
                        { name: "month", val: 2 },
                        { name: "year", val: 3 },
                      ].indexOf(type) > -1
                    }
                  />
                  <ListItemText primary={type.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            id="description"
            name="description"
            label="service description"
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

export default CreateServiceForm;
