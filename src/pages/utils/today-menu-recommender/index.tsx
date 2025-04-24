import KakaoDirectionMap from '@/components/KakaoDirectionMap';
import { Box } from '@mui/material';

const TodayMenuRecommender = () => {
  return (
    <Box p={2}>
      <Box width={'500px'}>
        <KakaoDirectionMap
          destinationAddress={'서울특별시 강남구 강남대로 464'}
        ></KakaoDirectionMap>
      </Box>
    </Box>
  );
};

export default TodayMenuRecommender;
