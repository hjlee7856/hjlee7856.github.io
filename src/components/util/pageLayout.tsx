import { Box, Stack } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const PageLayout = (props: Props) => {
  return (
    <Box p={2}>
      <Stack spacing={3}>{props.children}</Stack>
    </Box>
  );
};

export default PageLayout;
