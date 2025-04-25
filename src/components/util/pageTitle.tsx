import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  subTitle: string;
}

export const PageTitle = (props: Props) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold">
        {props.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={0.5}>
        {props.subTitle.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </Typography>
    </Box>
  );
};
