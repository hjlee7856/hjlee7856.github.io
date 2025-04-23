import { Box, TextField, Typography } from '@mui/material';

interface Props {
  handleCopy: () => {};
  text: string;
}

export const WorkReportPreview = (props: Props) => {
  return (
    <Box flex={1} flexDirection="column">
      <Box mb={1}>
        <Typography variant="subtitle1" fontWeight="bold">
          미리보기
        </Typography>
      </Box>
      <TextField
        onClick={props.handleCopy}
        multiline
        fullWidth
        minRows={10}
        value={props.text}
        sx={{ borderRadius: 2, backgroundColor: '#f5f5f5' }}
        slotProps={{
          input: {
            readOnly: true,
          },
          htmlInput: {
            sx: { cursor: 'pointer' },
          },
        }}
      />
      <Typography variant="subtitle2" color="textSecondary" align="center">
        클릭하면 클립보드에 복사됩니다.
      </Typography>
    </Box>
  );
};
