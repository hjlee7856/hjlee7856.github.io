import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { MenuResult } from '../menu';

interface ResultCardProps {
  result: {
    first: MenuResult;
    second: MenuResult;
    third: MenuResult;
    allRankings: { menu: MenuResult; score: number }[];
    userWeights: { [key: string]: number };
  };
  showAllRankings: boolean;
  onReset: () => void;
  onShare: () => void;
  onToggleRankings: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  result,
  showAllRankings,
  onReset,
  onShare,
  onToggleRankings,
}) => {
  const getRadarData = (weights: { [key: string]: number }) => {
    return [
      { subject: '육류', value: weights.meat * 100 },
      { subject: '채소', value: weights.vegetable * 100 },
      { subject: '온도', value: weights.temperature * 100 },
      { subject: '매운맛', value: weights.spicy * 100 },
      { subject: '단맛', value: weights.sweet * 100 },
      { subject: '짠맛', value: weights.salty * 100 },
      { subject: '신맛', value: weights.sour * 100 },
      { subject: '기름기', value: weights.oily * 100 },
    ];
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        추천 메뉴
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h6" color="primary">
          1순위: {result.first.name}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: 'text.secondary' }}>
          {result.first.description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'primary.main' }}>
          적합도: {result.allRankings[0].score.toFixed(1)}%
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          2순위: {result.second.name}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'primary.main' }}>
          적합도: {result.allRankings[1].score.toFixed(1)}%
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          3순위: {result.third.name}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'primary.main' }}>
          적합도: {result.allRankings[2].score.toFixed(1)}%
        </Typography>

        <Box sx={{ mt: 2, width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getRadarData(result.userWeights)}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="사용자"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
        <Box
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          gap={1}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Button variant="contained" onClick={onReset} sx={{ width: '40%' }}>
            다시하기
          </Button>

          <Button variant="contained" onClick={onShare} sx={{ width: '40%' }}>
            공유하기
          </Button>

          <Button variant="outlined" onClick={onToggleRankings} sx={{ width: '40%' }}>
            {showAllRankings ? '전체 순위 닫기' : '전체 순위 보기'}
          </Button>

          {showAllRankings && (
            <Box
              sx={{
                mt: 2,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                전체 순위
              </Typography>
              {result.allRankings.map((item, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: index < 3 ? 'primary.main' : 'text.secondary',
                    fontWeight: index < 3 ? 'bold' : 'normal',
                  }}
                >
                  {index + 1}위: {item.menu.name} ({item.score.toFixed(1)}%)
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ResultCard;
