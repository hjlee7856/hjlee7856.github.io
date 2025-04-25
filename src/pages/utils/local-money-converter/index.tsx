import PageLayout from '@/components/util/pageLayout';
import { PageTitle } from '@/components/util/pageTitle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const MAX_ALLOWED = 10_000_000_000_000_000; // 1경

/**
 * 숫자를 한글 금액으로 변환하는 함수
 */
const numberToKorean = (num: number): string => {
  if (isNaN(num)) return '';

  const han1 = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const han2 = ['', '십', '백', '천'];
  const unit = ['', '만', '억', '조', '경'];

  const str = String(num);
  let result = '';
  let unitIdx = 0;

  for (let i = str.length; i > 0; i -= 4) {
    const slice = str.substring(Math.max(i - 4, 0), i);
    let chunkStr = '';

    for (let j = 0; j < slice.length; j++) {
      const digit = parseInt(slice[j]);
      if (digit !== 0) {
        chunkStr += han1[digit] + han2[slice.length - j - 1];
      }
    }

    if (chunkStr !== '') {
      result = chunkStr + unit[unitIdx] + result;
    }

    unitIdx++;
  }

  return result;
};

const TITLE = '금액 한글 변환기';
const SUB_TITLE = '숫자로 입력된 금액을 한글 금액으로 변환합니다. \n최대 1경까지 입력 가능합니다.';

const LocalMoneyConverter = () => {
  const [input, setInput] = useState('');
  const [converted, setConverted] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, '').replace(/\D/g, '');
    const numeric = Number(raw);

    if (numeric >= MAX_ALLOWED) return;

    setInput(numeric.toLocaleString());
    setConverted(numberToKorean(numeric));
  };

  const handleCopy = async () => {
    if (converted) {
      await navigator.clipboard.writeText(converted);
      setToastOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCopy();
    }
  };

  return (
    <PageLayout>
      <PageTitle title={TITLE} subTitle={SUB_TITLE} />
      <TextField
        label="금액을 입력하세요"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        slotProps={{
          htmlInput: {
            inputMode: 'numeric',
          },
          input: {
            endAdornment: (
              <InputAdornment position="start">
                <Typography>원</Typography>
              </InputAdornment>
            ),
          },
        }}
      />

      {converted && (
        <Box
          display="flex"
          alignItems="center"
          sx={{ borderRadius: 2, backgroundColor: '#f5f5f5', p: 1, pl: 2 }}
        >
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            {converted + ' 원'}
          </Typography>
          <Tooltip title="클립보드에 복사">
            <IconButton onClick={handleCopy}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        message="금액이 클립보드에 복사되었습니다"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </PageLayout>
  );
};

export default LocalMoneyConverter;
