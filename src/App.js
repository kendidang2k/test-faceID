import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FaceRecognition from './components/organisms/FaceRecognition';
import closeIcon from './assets/icons/close-icon.png'

import './App.css';
import { ButtonBase } from '@mui/material';
import InfomationForm from './components/organisms/InfomationForm';
import TakePhoto from './components/organisms/TakePhoto';
import CameraAction from './components/molecules/CameraAction';
import StoreProvider, { StoreContext } from './context/StoreProvider/StoreProvider';
import ShowPicture from './components/organisms/ShowPicture';

function App() {


  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const { moveToNextStep, setFrontCard, setBackCard } = useContext(StoreContext)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = useMemo(() => [
    {
      label: 'Select campaign settings',
      description: <InfomationForm />,
      isCameraAction: false,
      canTurnBack: false
    },
    {
      label: 'Select campaign settings',
      description: <TakePhoto actionFn={handleNext} setCard={setFrontCard} />,
      isCameraAction: true,
      canTurnBack: false
    },
    {
      label: 'Select campaign settings',
      description: <ShowPicture />,
      isCameraAction: false,
      canTurnBack: true,
      isShowImage: true
    },
    {
      label: 'Select campaign settings',
      description: <FaceRecognition />,
      isCameraAction: true,
      canTurnBack: true
    },
    {
      label: 'Select campaign settings',
      description: <TakePhoto actionFn={handleNext} />,
      isCameraAction: true,
      canTurnBack: false
    },
    {
      label: 'Select campaign settings',
      description: <ShowPicture />,
      isCameraAction: false,
      canTurnBack: true,
      isShowImage: true
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
      isCameraAction: true,
      canTurnBack: true
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
      isCameraAction: true,
      canTurnBack: true
    },
  ], [])

  const maxSteps = steps.length;

  return (
    <div className='App'>
      <Box sx={{ maxWidth: '100%', flexGrow: 1, height: '100vh', overflow: 'hidden', }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'inherit',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: '1000'
          }}
        >
          <ButtonBase onClick={handleBack} >
            <Box component={"img"} src={closeIcon} alt="close icon" />
          </ButtonBase>
        </Paper>
        <Box className={steps[activeStep].isCameraAction ? "action__full__height" : ""} sx={{ height: "calc(100vh - 113px)", width: '100%', overflow: 'scroll' }}>
          {steps[activeStep].description}
        </Box>
        {!steps[activeStep].isCameraAction && <MobileStepper
          sx={{ bottom: 0, left: 0, height: '113px', justifyContent: 'space-evenly', padding: 0, backgroundColor: "#221F3A", }}
          position="static"
          nextButton={
            <ButtonBase
              className={steps[activeStep].canTurnBack ? "" : "button__next__full__width"}
              sx={{ width: '160px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(267.74deg, #6359D9 -4.45%, #B147F8 105.31%)', borderRadius: '15px', color: '#fff', fontSize: '16px' }}
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Tiếp theo
            </ButtonBase>
          }
          backButton={
            !steps[activeStep].isCameraAction && steps[activeStep].canTurnBack && <ButtonBase
              sx={{ width: '160px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px', color: '#fff', fontSize: '16px', border: '1px solid #FFFFFF' }}
              onClick={handleBack} disabled={activeStep === 0}>
              Chụp lại
            </ButtonBase>
          }
        />}
      </Box>
    </div>
  );
}

export default App;
