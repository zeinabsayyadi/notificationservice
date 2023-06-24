import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import TestForm from "../TestForm";
import CreateProjectName from "./CreateProjectName";
import DynamicInput from "../DynamicInput";
const steps = ["Create Project", "Add Entities", "Add Roles"];

const CustomStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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
    <Box
      sx={{
        marginTop: "2rem",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stepper activeStep={activeStep} sx={{ width: "100%" }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
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
      ) : activeStep === 1 ? (
        <>
          <CreateProjectName submit={true} />
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", pt: 2, width: "100%" }}
          >
            <ButtonBase
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </ButtonBase>
            <Box sx={{ flex: "1 1 auto" }} />

            <ButtonBase onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </ButtonBase>
          </Box>
        </>
      ) : activeStep === 2 ? (
        <>
          <TestForm submit={true} />
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", pt: 2, width: "100%" }}
          >
            <ButtonBase
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </ButtonBase>
            <Box sx={{ flex: "1 1 auto" }} />

            <ButtonBase onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </ButtonBase>
          </Box>
        </>
      ) : (
        <>
          <DynamicInput />
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", pt: 2, width: "100%" }}
          >
            <ButtonBase
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </ButtonBase>
            <Box sx={{ flex: "1 1 auto" }} />

            <ButtonBase onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </ButtonBase>
          </Box>
        </>
      )}
    </Box>
  );
};
export default CustomStepper;
