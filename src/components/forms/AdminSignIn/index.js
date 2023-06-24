import { useState } from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import logo from '../../../assets/img/SivanNotifyLogo.svg'
import { AiFillLock } from "react-icons/ai";
import {Style} from '../../../pages/Landing/Landing.style'
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { ButtonBase, IconButton, Paper, useTheme } from "@mui/material";
import { admin_login } from "../../../api/admin";
import { useDispatch } from "react-redux";
import { sign } from "../../../Redux/features/UserSlice";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: require('../../../assets/img/loginBackgroundfirsrt.png'),
  },
  {
    label: 'Bird',
    imgPath: require('../../../assets/img/loginBackgroundsecond.png'),
  },
 
]; 

function AdminSignIn() {
  const theme = useTheme();
  const classes = Style(theme);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;
  const [loading, setLoading] = useState(true);
  const schema = yup.object().shape({
    phone: yup.number().required("phone is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "its charachter must be more than 6"),
  });
  const handleSubmitForm = (values) => {
    axios
      .post(admin_login, {
        payload: values.phone,
        password: values.password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          const userInfo = {
            type: "admin",
            token: res.data.data,
            access_key: "",
            license_key: "",
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          dispatch(sign(userInfo));
          navigation("/");
        }
      })
      .catch((err) => {
        console.log("login err", err);
      });
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    onSubmit: handleSubmitForm,
    validationSchema: schema,
  });
  
  function handleClick() {
    setLoading(true);
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={classes.WrapperBox}>
      <Box sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:'50vw',
        hight:'80vh',
       
      }}>
      <Box>
      <AutoPlaySwipeableViews
      className={classes.innerBox}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
       
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                
                sx={{
                  height: '95vh',
                  display: 'block',
                  maxWidth: '50vw',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
      
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButtonBase ={
          <ButtonBase 
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </ButtonBase >
        }
        backButtonBase ={
          <ButtonBase  size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </ButtonBase >
        }
      />
    </Box>
    </Box>
     
    <Box 
    className={classes.innerBox}
    sx={{
      display: 'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
   <Box sx={classes.PaperBox}>
      <CssBaseline />
      <Paper   elevation={0}
          sx={classes.Paper}
          >
      <Box sx={{
            display :'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            marginBottom:"3rem"
          }}>
          <IconButton >
          <AiFillLock color='#E2542E' size='32px'/>
          </IconButton>
          <Typography
            variant="h4"
            fontFamily='Audiowide'
            letterSpacing='50%'
            color = 'rgba(58,101,60,1)'
           
          >
            Sign In
          </Typography>
          </Box>
       
        <form onSubmit={formik.handleSubmit} style={classes.form}>
          <TextField
            id="phone"
            name="phone"
            label="phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={classes.inputField}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={classes.inputField}
            
          />
          <ButtonBase sx={classes.button} type="submit">
            Sign In
          </ButtonBase>
        </form>
      </Paper>
    </Box>
    </Box>
    </Box>
   
  );
}

export default AdminSignIn;
