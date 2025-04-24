import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

interface Props {
  handleCopy: (text: string) => {};
  resetData: () => void;
  text: string;
}

export const WorkReportPreview = (props: Props) => {
  const [checked, setChecked] = useState(false);
  const [report, setReport] = useState(props.text);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked) setReport(props.text + '\n@devops');
    if (!event.target.checked) setReport(report.replace('@devops', '').trim());
  };

  const handleReset = () => {
    setChecked(false);
    setReport('');
    props.resetData();
  };

  useEffect(() => {
    if (checked) setReport(props.text + '\n@devops');
    if (!checked && report) setReport(report.replace('@devops', '').trim());
  }, [props.text]);

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
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="개발팀"
        ></FormControlLabel>
      </Box>
      <Box position={'relative'}>
        <TextField
          multiline
          fullWidth
          minRows={10}
          value={report}
          sx={{ borderRadius: 2, backgroundColor: '#f5f5f5' }}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <Tooltip title="클립보드에 복사" sx={{ position: 'absolute', right: 1, top: 1 }}>
          <IconButton size="small" onClick={() => props.handleCopy(report)}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="초기화" sx={{ position: 'absolute', right: 1, bottom: 1 }}>
          <IconButton size="small" onClick={handleReset}>
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
