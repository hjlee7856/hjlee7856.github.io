import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { MenuResult } from '../menu';

interface ResultCardProps {
  result: {
    menus: MenuResult[];
  };
  onReset: () => void;
  onShare: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset, onShare }) => {
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
        {result.menus.length === 1 ? (
          <>
            <Typography variant="h6" color="primary">
              {result.menus[0].name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, textAlign: 'center', color: 'text.secondary' }}
            >
              {result.menus[0].description}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
              {result.menus.length}개의 후보 메뉴가 남았습니다:
            </Typography>
            {result.menus.map((menu, idx) => (
              <Box key={menu.id} sx={{ mb: 2, width: '100%' }}>
                <Typography variant="h6" color="primary">
                  {idx + 1}. {menu.name}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                  {menu.description}
                </Typography>
              </Box>
            ))}
          </>
        )}
        <Box
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          gap={1}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ mt: 2 }}
        >
          <Button variant="contained" onClick={onReset} sx={{ width: '40%' }}>
            다시하기
          </Button>
          <Button variant="contained" onClick={onShare} sx={{ width: '40%' }}>
            공유하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultCard;
