import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import { DeleteButtonProps } from '../types';

export const DeleteButton = ({ item, editingKey, handleDelete }: DeleteButtonProps) => {
  if (editingKey) return null;

  return (
    <Tooltip title="삭제">
      <IconButton onClick={(e) => handleDelete(e, item)} size="small">
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
    </Tooltip>
  );
};
