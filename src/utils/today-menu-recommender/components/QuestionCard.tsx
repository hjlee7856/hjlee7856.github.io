import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { Question } from '../questions';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (optionIndex: number) => void;
}

const QuestionCard = ({ question, currentIndex, totalQuestions, onAnswer }: QuestionCardProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <LinearProgress
        variant="determinate"
        value={(currentIndex / totalQuestions) * 100}
        sx={{ mb: 2, width: '100%' }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {currentIndex + 1} / {totalQuestions}
      </Typography>
      <Typography variant="h6" gutterBottom textAlign="center">
        {question.text}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, width: '100%' }}>
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => onAnswer(index)}
            sx={{ justifyContent: 'center', textAlign: 'center' }}
          >
            {option.text}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default QuestionCard;
