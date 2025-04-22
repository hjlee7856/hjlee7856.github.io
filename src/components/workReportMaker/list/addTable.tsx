import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { IconButton, TableCell, TableRow, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import { useState } from 'react';

interface Props {
  section: string;
  handleAdd: (section: string, category: string, content: string) => void;
}

export const AddWorkReportList = (props: Props) => {
  const [localCategory, setLocalCategory] = useState('');
  const [localContent, setLocalContent] = useState('');

  const handleAddLocal = () => {
    props.handleAdd(props.section, localCategory, localContent);
    handleResetLocal();
  };

  const handleResetLocal = () => {
    setLocalCategory('');
    setLocalContent('');
  };

  return (
    <TableRow
      sx={{
        backgroundColor: green[50],
      }}
    >
      <TableCell>{props.section}</TableCell>
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
        <IconButton onClick={handleAddLocal} size="small">
          <AddIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={handleResetLocal} size="small">
          <RestartAltIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
