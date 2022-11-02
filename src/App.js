import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import FaceRecognition from "./components/organisms/FaceRecognition";
import closeIcon from "./assets/icons/close-icon.png";
import { ButtonBase, CircularProgress, Typography } from "@mui/material";
import InfomationForm from "./components/organisms/InfomationForm";
import TakePhoto from "./components/organisms/TakePhoto";
import { StoreContext } from "./context/StoreProvider/StoreProvider";
import ShowPicture from "./components/organisms/ShowPicture";
import ShowFacePicture from "./components/organisms/ShowFacePicture";
import RecognizeNotification from "./components/organisms/RecognizeNotification";
import { RecognizeNotificationData } from "./constants/Notification";
import { SystemCore } from "./core";

import "./App.css";

function App() {
  const [activeStep, setActiveStep] = useState(1);
  const {
    compareFace,
    isUploadFrontCard,
    isUploadBackCard,
    isUploadLiveNess,
    videoFrontCardUrl,
    videoBackCardUrl,
    videoLiveNessUrl,
    isRecognizeFaceSuccessful,
    isActionProcesssing
  } = useContext(StoreContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep == 6) {
      setActiveStep(1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const steps = [
    {
      label: "Fill Infomation Form",
      description: <InfomationForm actionNextStep={handleNext} />,
      isCameraAction: false,
      canTurnBack: false,
    },
    {
      label: "Take Front Identity Card Photo",
      description: <TakePhoto actionFn={handleNext} isFrontCard={true} />,
      isCameraAction: true,
      canTurnBack: false,
    },
    {
      label: "Show Front Identity Card Photo",
      description: <ShowPicture isFrontCard={true} />,
      isCameraAction: false,
      canTurnBack: true,
      isShowImage: true,
    },
    {
      label: "Take Back Identity Card Photo",
      description: <TakePhoto actionFn={handleNext} isFrontCard={false} />,
      isCameraAction: true,
      canTurnBack: false,
    },
    {
      label: "Show Back Identity Card Photo",
      description: <ShowPicture isFrontCard={false} />,
      isCameraAction: false,
      canTurnBack: true,
      isShowImage: true,
    },
    {
      label: "Reconize face",
      description: <FaceRecognition actionFn={handleNext} />,
      isCameraAction: true,
      canTurnBack: false,
    },
    {
      label: "Show Back Identity Card Photo",
      description: <ShowFacePicture />,
      isCameraAction: false,
      canTurnBack: true,
      isShowImage: true,
    },
    {
      label: "Show Recognize Notification",
      description: (
        <RecognizeNotification notiData={RecognizeNotificationData} />
      ),
      isCameraAction: false,
      canTurnBack: true,
      isShowImage: true,
    },
  ];

  const maxSteps = steps.length;

  console.log("APPJS", isUploadFrontCard, isUploadBackCard, isUploadLiveNess);
  console.log(
    "APPxxxxJS",
    videoFrontCardUrl,
    videoBackCardUrl,
    videoLiveNessUrl
  );

  return (
    <div className="App">
      <Box
        sx={{
          maxWidth: "100%",
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "inherit",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: "1000",
          }}
        >
          {!activeStep == maxSteps - 1 && (
            <ButtonBase onClick={handleBack}>
              <Box component={"img"} src={closeIcon} alt="close icon" />
            </ButtonBase>
          )}
        </Paper>
        <Box
          className={
            steps[activeStep].isCameraAction ? "action__full__height" : ""
          }
          sx={{
            height: "calc(100vh - 113px)",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {steps[activeStep].description}
        </Box>
        {!steps[activeStep].isCameraAction && (
          <MobileStepper
            sx={{
              bottom: 0,
              left: 0,
              height: "113px",
              justifyContent: "space-evenly",
              padding: 0,
              backgroundColor: "#221F3A",
            }}
            position="static"
            nextButton={
              <ButtonBase
                className={
                  steps[activeStep].canTurnBack
                    ? ""
                    : "button__next__full__width"
                }
                sx={{
                  width: "160px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(267.74deg, #6359D9 -4.45%, #B147F8 105.31%)",
                  borderRadius: "15px",
                  color: "#fff",
                  fontSize: "16px",
                }}
                onClick={() => {
                  if (activeStep === 6) {
                    SystemCore.send({
                      command: "ekyc-complete",
                      value: {
                        videoFrontCardUrl,
                        videoBackCardUrl,
                        videoLiveNessUrl,
                      },
                    });
                    return;
                  }
                  handleNext();
                }}
                disabled={
                  activeStep === maxSteps - 1 ||
                  !compareFace ||
                  isUploadFrontCard ||
                  isUploadBackCard ||
                  isUploadLiveNess ||
                  !isRecognizeFaceSuccessful ||
                  isActionProcesssing
                }
              >
                {
                  isActionProcesssing ? <CircularProgress /> : <Typography component={"p"}>{activeStep === 6 ? "Hoàn thành" : "Tiếp theo"}</Typography>
                }
              </ButtonBase>
            }
            backButton={
              activeStep !== 6 &&
              !steps[activeStep].isCameraAction &&
              steps[activeStep].canTurnBack && (
                <ButtonBase
                  sx={{
                    width: "160px",
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "15px",
                    color: "#fff",
                    fontSize: "16px",
                    border: "1px solid #FFFFFF",
                  }}
                  onClick={handleBack}
                  disabled={activeStep === 0 || isActionProcesssing}
                >
                  {
                    isActionProcesssing ? <CircularProgress /> : <Typography component={"p"}>Chụp lại</Typography>
                  }
                </ButtonBase>
              )
            }
          />
        )}
      </Box>
    </div>
  );
}

export default App;
