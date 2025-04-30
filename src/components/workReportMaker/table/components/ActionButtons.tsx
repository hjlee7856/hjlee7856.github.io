import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Tooltip } from '@mui/material';
import { ActionButtonsProps } from '../types';

export const ActionButtons = ({
  item,
  editingKey,
  handleSaveEdit,
  setEditingKey,
}: ActionButtonsProps) => {
  if (!editingKey) return null;

  return (
    <Box display="flex" justifyContent="flex-end">
      <Tooltip title="저장">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleSaveEdit(item.content);
            setEditingKey(null);
          }}
          size="small"
        >
          <CheckIcon fontSize="small" color="success" />
        </IconButton>
      </Tooltip>
      <Tooltip title="취소">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setEditingKey(null);
          }}
          size="small"
        >
          <CloseIcon fontSize="small" color="error" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
