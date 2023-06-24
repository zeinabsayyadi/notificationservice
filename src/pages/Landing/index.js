import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ButtonBase, IconButton } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import logo from '../../assets/img/SivanNotifyLogo.svg'
import CustomBackdrop from '../../components/CustomBackdrop';
import { signIn_owner, signUp_owner } from '../../api/owner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../Redux/features/UserSlice';
import {Style} from './Landing.style'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: require('../../assets/img/loginBackgroundfirsrt.png'),
  },
  {
    label: 'Bird',
    imgPath: require('../../assets/img/loginBackgroundsecond.png'),
  },
 
];

function Landing() {
  const theme = useTheme();
  const classes = Style(theme);
  const { token } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;
  const [loading, setLoading] = useState(true);
  function handleClick() {
    setLoading(true);
  }
    //redirect to sso
    const externalRefrenceByHTML = (htmlData = <></>) => {
      const div = document.createElement("div");
      div.innerHTML = htmlData;
      document.body.appendChild(div);
      div.firstElementChild.submit();
    };
    //input : null
    //output: html of sso signin page
    const handleClicksignIn = () => {
      setOpen(true);
      console.log(open);
      axios
        .get(`${signIn_owner}`)
        .then((res) => {
          console.log("res", res.data.data);
          externalRefrenceByHTML(res?.data?.data);
        })
        .catch((err) => console.log(err));
    };
  
  //input : null
    //output: html of sso signup page
    const handleClicksignUp = () => {
      setOpen(true);
      axios
        .get(`${signUp_owner}`)
        .then((res) => {
          console.log("res", res?.data?.data);
          externalRefrenceByHTML(res?.data?.data);
        })
        .catch((err) => console.log(err));
    };

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
    {!token && (
      <Box sx={classes.PaperBox}>
        <CustomBackdrop open={open} setOpen={setOpen} />
         <Paper
         elevation={0}
          sx={classes.Paper}>
          <Box sx={{
            display :'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            marginBottom:"3rem"
          }}>
          <IconButton >
          <img src={logo}>
            </img>
          </IconButton>
          <Typography
            variant="h4"
            fontFamily='Audiowide'
            letterSpacing='50%'
            color = 'rgba(58,101,60,1)'
           
          >
           SIVAN NOTIFY
          </Typography>
          </Box>
          <from style={classes.form}>
            <ButtonBase
              type="submit"
              
              onClick={handleClicksignIn}
              sx={classes.button}
            >
              Sign in
            </ButtonBase>

            <ButtonBase
              type="submit"
              onClick={handleClicksignUp}
              sx={classes.button}
              
            >
              Sign up
            </ButtonBase>
            <ButtonBase
              type="submit"
              onClick={handleClicksignUp}
              sx={{
                marginY: "1rem",
                color: '#E2542E',
              }}
            >
              forget your password?
            </ButtonBase>
          </from>
        </Paper>
      </Box>
    )}
    </Box>
    </Box>
   
  );
}

export default Landing;
