import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';

interface Props {
  handleCopy: () => {};
  resetData: () => void;
  text: string;
}

export const WorkReportPreview = (props: Props) => {
  return (
    <Box flex={1} flexDirection="column">
      <Box display={'flex'} flex={1} mb={1} flexDirection="row" justifyContent={'space-between'}>
        <Typography variant="subtitle1" fontWeight="bold">
          미리보기
        </Typography>
      </Box>
      <Box position={'relative'}>
        <TextField
          multiline
          fullWidth
          minRows={10}
          value={props.text}
          sx={{ borderRadius: 2, backgroundColor: '#f5f5f5' }}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <Tooltip title="클립보드에 복사" sx={{ position: 'absolute', right: 1, top: 1 }}>
          <IconButton size="small" onClick={props.handleCopy}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="초기화" sx={{ position: 'absolute', right: 1, bottom: 1 }}>
          <IconButton size="small" onClick={props.resetData}>
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
