import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton, TextField, Typography } from '@mui/material';

interface Props {
  handleCopy: () => {};
  text: string;
}

export const WorkReportPreview = (props: Props) => {
  return (
    <Box flex={1} flexDirection="column">
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="subtitle1" fontWeight="bold">
          보고서 미리보기
        </Typography>
        <IconButton size="small" onClick={props.handleCopy}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Box>
      <TextField
        multiline
        fullWidth
        minRows={10}
        value={props.text}
        sx={{ borderRadius: 2, backgroundColor: '#f5f5f5' }}
        InputProps={{ readOnly: true }}
      />
    </Box>
  );
};
