import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TableCell, TableRow, TextField, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import { KeyboardEvent, useState } from 'react';

interface Props {
  section: string;
  handleAdd: (section: string, category: string, content: string) => void;
  setIsAdding: (isAdding: boolean) => void;
  allContentItems: { section: string; category: string; content: string }[];
}

export const AddWorkReportList = (props: Props) => {
  const [localCategory, setLocalCategory] = useState('');
  const [localContent, setLocalContent] = useState('');

  const isDuplicate = props.allContentItems.some(
    (item) =>
      item.section === props.section &&
      item.category === localCategory &&
      item.content === localContent
  );

  const handleAddLocal = () => {
    if (isDuplicate) return;
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
          error={isDuplicate}
          label={isDuplicate ? '중복된 항목입니다' : '내용'}
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          fullWidth
          size="small"
          onKeyDown={handleEnterSave}
        />
      </TableCell>
      <TableCell align="right">
        <Tooltip title={isDuplicate ? '중복된 항목은 저장할 수 없습니다' : '저장'}>
          <IconButton onClick={handleAddLocal} size="small" disabled={isDuplicate}>
            <CheckIcon fontSize="small" color="success" />
          </IconButton>
        </Tooltip>
        <Tooltip title="취소">
          <IconButton onClick={handleResetLocal} size="small">
            <CloseIcon fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
