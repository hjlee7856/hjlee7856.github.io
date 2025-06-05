import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import WorkReportPreviewSkeleton from './WorkReportPreviewSkeleton';

interface Props {
  resetData: () => void;
  text: string;
  isLoading?: boolean;
}

export const WorkReportPreview = (props: Props) => {
  const [checkedDev, setCheckedDev] = useState(false);
  const [checkedHalfDayOffAm, setCheckedHalfDayOffAm] = useState(false);
  const [checkedHalfDayOffPm, setCheckedHalfDayOffPm] = useState(false);
  const [report, setReport] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleReset = () => {
    if (window.confirm('정말 초기화하시겠습니까?')) {
      setCheckedDev(false);
      setCheckedHalfDayOffAm(false);
      setCheckedHalfDayOffPm(false);
      setReport('');
      props.resetData();
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(report);
    setOpenSnackbar(true);
  };

  useEffect(() => {
    const lines = props.text.split('\n');
    let firstLine = lines[0];

    // 기존에 반차 문구가 포함되어 있을 수 있으므로 제거
    firstLine = firstLine.replace(/\s*\(오전 반차\)/, '').replace(/\s*\(오후 반차\)/, '');

    if (checkedHalfDayOffAm) {
      firstLine += ' (오전 반차)';
    } else if (checkedHalfDayOffPm) {
      firstLine += ' (오후 반차)';
    }

    lines[0] = firstLine;
    let result = lines.join('\n');

    if (checkedDev) {
      result += '\n@devops';
    }

    setReport(result);
  }, [props.text, checkedDev, checkedHalfDayOffAm, checkedHalfDayOffPm]);

  if (props.isLoading) return <WorkReportPreviewSkeleton />;

  return (
    <Box flex={1} flexDirection="column">
      <Box
        display={'flex'}
        flex={1}
        mb={1}
        flexDirection="row"
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          미리보기
        </Typography>
      </Box>
      <Box position={'relative'}>
        <TextField
          multiline
          fullWidth
          minRows={10}
          value={report}
          onChange={(e) => setReport(e.target.value)}
          sx={{ borderRadius: 2 }}
        />
        <Tooltip title="클립보드에 복사" sx={{ position: 'absolute', right: 1, top: 1 }}>
          <IconButton size="small" onClick={handleCopy}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="초기화" sx={{ position: 'absolute', right: 1, bottom: 1 }}>
          <IconButton size="small" onClick={handleReset}>
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      </Box>
      <FormControlLabel
        control={
          <Checkbox checked={checkedDev} onChange={(e) => setCheckedDev(e.target.checked)} />
        }
        label="개발팀"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedHalfDayOffAm}
            onChange={(e) => {
              setCheckedHalfDayOffAm(e.target.checked);
              setCheckedHalfDayOffPm(false);
            }}
          />
        }
        label="오전반차"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedHalfDayOffPm}
            onChange={(e) => {
              setCheckedHalfDayOffAm(false);
              setCheckedHalfDayOffPm(e.target.checked);
            }}
          />
        }
        label="오후반차"
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="보고서가 클립보드에 복사되었습니다."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};
