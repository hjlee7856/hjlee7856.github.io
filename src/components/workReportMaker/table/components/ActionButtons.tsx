import CheckIcon from '@mui/icons-material/Check';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { IconButton, TableCell, Tooltip } from '@mui/material';
import { ActionButtonsProps, SECTION_TYPES } from '../types';

export const ActionButtons = ({
  item,
  editingKey,
  handleSaveEdit,
  setEditingKey,
  handleMoveSection,
}: ActionButtonsProps) => {
  if (!editingKey) return null;

  return (
    <TableCell align="right" sx={{ minWidth: '150px' }}>
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
      {item.section === SECTION_TYPES.TODAY && (
        <Tooltip title="익일로 이동">
          <IconButton
            onClick={(e) => handleMoveSection(e, item.content, SECTION_TYPES.TOMORROW)}
            size="small"
          >
            <SouthIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      )}
      {item.section === SECTION_TYPES.TOMORROW && (
        <Tooltip title="금일로 이동">
          <IconButton
            onClick={(e) => handleMoveSection(e, item.content, SECTION_TYPES.TODAY)}
            size="small"
          >
            <NorthIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      )}
    </TableCell>
  );
};
