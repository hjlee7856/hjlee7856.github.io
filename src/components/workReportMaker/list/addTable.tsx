import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TableCell, TableRow, TextField, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import { KeyboardEvent, useState } from 'react';

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

  const handleEnterSave = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleAddLocal();
    }
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
          fullWidth
          size="small"
          onKeyDown={handleEnterSave}
        />
      </TableCell>
      <TableCell>
        <TextField
          label="내용"
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          fullWidth
          size="small"
          onKeyDown={handleEnterSave}
        />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="저장">
          <IconButton onClick={handleAddLocal} size="small">
            <CheckIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="취소">
          <IconButton onClick={handleResetLocal} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
