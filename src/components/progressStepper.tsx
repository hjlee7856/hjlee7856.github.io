import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';

interface Props {
  step: number;
  setStep: (step: number) => void;
  totalStep: number;
}

export default function ProgressMobileStepper(props: Props) {
  const handleNext = () => {
    props.setStep(props.step + 1);
  };

  const handleBack = () => {
    props.setStep(props.step - 1);
  };

  return (
    <MobileStepper
      variant="progress"
      steps={props.totalStep}
      position="static"
      activeStep={props.step}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={props.step === props.totalStep - 1}>
          다음
          {<KeyboardArrowLeft />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={props.step === 0}>
          {<KeyboardArrowRight />}
          이전
        </Button>
      }
    />
  );
}
