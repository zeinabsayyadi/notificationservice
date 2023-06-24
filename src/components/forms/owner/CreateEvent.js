import {
  Box,
  ButtonBase,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CheckId from "./CheckId";
import EventCreationForm from "./EventCreationForm";
const steps = ["checking Id", "Create Event"];
const CreateEvent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const [nameSpace, setNameSpace] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [resultStatus, setResultStatus] = useState(false);
  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{
      display:'flex',
      width:'100vw',
      maxHeight:'90vh',
      alignItems:'center',
      justifyContent:'center'
    }}>
    <Box
      sx={{
       margin:'10%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography  variant="h4"
            fontFamily='Audiowide'
            letterSpacing='50%'
            color = 'rgba(58,101,60,1)'
            >
          Create Event
      </Typography>
      <Stepper activeStep={activeStep} sx={{ width: "100%" }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps} sx={{
              color:'#247860',
            }}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", pt: 2, width: "100%" }}
          >
            <Box sx={{ flex: "1 1 auto" }} />
            <ButtonBase onClick={handleReset}>Reset</ButtonBase>
          </Box>
        </>
      ) : activeStep === 0 ? (
        <>
          <CheckId
            setUserId={setUserId}
            setNameSpace={setNameSpace}
            setSocketId={setSocketId}
          />
          <Typography sx={{ mt: 2, mb: 1 }} color='#E2542E'>Step {activeStep + 1}</Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", pt: 2, width: "100%" }}
          >
            <ButtonBase
              color='#E2542E'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </ButtonBase>
            <Box sx={{ flex: "1 1 auto" }} />

            <ButtonBase onClick={handleNext} disabled={!userId}>
              {activeStep === steps.length ? "Finish" : "Next"}
            </ButtonBase>
          </Box>
        </>
      ) : activeStep === 1 ? (
        <>
          <EventCreationForm
            setResultStatus={setResultStatus}
            userId={userId}
            nameSpace={nameSpace}
            socketId={socketId}
          />
          <Typography sx={{ mt: 2, mb: 1 }} color='#E2542E'>Step {activeStep + 1}</Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", pt: 2, width: "100%" }}
          >
            <ButtonBase
              color='#E2542E'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </ButtonBase>
            <Box sx={{ flex: "1 1 auto" }} />

            <ButtonBase onClick={handleNext} color='#E2542E'>
              {activeStep === steps.length ? "Finish" : "Next"}
            </ButtonBase>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }} color='red'>invalid step</Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", pt: 2, width: "100%" }}
          >
            <Box sx={{ flex: "1 1 auto" }} />
            <ButtonBase onClick={handleReset} color='#E2542E'>Reset</ButtonBase>
          </Box>
        </>
      )}
    </Box>
    </Box>
  );
};
export default CreateEvent;
