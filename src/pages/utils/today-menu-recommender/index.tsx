import NaverMap from '@/components/naverMap';
import { Box } from '@mui/material';

const TodayMenuRecommender = () => {
  return (
    <Box p={2}>
      <Box width={'500px'}>
        <NaverMap destinationAddress={'도곡길 27'} />
      </Box>
    </Box>
  );
};

export default TodayMenuRecommender;
