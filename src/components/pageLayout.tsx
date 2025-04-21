import { Box, Typography } from '@mui/material';

interface Props {
  children: React.ReactNode;
  title: string;
}

export const PageLayout = ({ children, title }: Props) => {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} mt={16}>
      <Typography variant="h4" fontWeight={'bold'}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};
