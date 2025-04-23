import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton, TableCell, TableRow, TextField, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import { useState } from 'react';
interface Props {
  section: string;
  handleAdd: (section: string, category: string, content: string) => void;
  setIsAdding: (isAdding: boolean) => void;
}

export const AddWorkReportList = (props: Props) => {
  const [localCategory, setLocalCategory] = useState('');
  const [localContent, setLocalContent] = useState('');

  const handleAddLocal = () => {
    props.handleAdd(props.section, localCategory, localContent);
    handleResetLocal();
    props.setIsAdding(false);
  };

  const handleResetLocal = () => {
    setLocalCategory('');
    setLocalContent('');
    props.setIsAdding(false);
  };

  return (
    <TableRow
      sx={{
        backgroundColor: green[50],
      }}
    >
      <TableCell>
        <TextField
          error={localCategory === ''}
          label={localCategory === '' ? '필수' : '카테고리'}
          value={localCategory}
          onChange={(e) => setLocalCategory(e.target.value)}
          multiline
          fullWidth
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          label="내용"
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          multiline
          fullWidth
          size="small"
        />
      </TableCell>
      <TableCell align="center">
        <Tooltip title="저장">
          <IconButton onClick={handleAddLocal} size="small">
            <SaveIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="취소">
          <IconButton onClick={handleResetLocal} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
