import { TextField } from '@mui/material';
import { EditableCellProps } from '../types';

export const EditableCell = ({
  item,
  field,
  editingMap,
  handleEditChange,
  handleEnterSave,
}: EditableCellProps) => {
  const value = editingMap[item.content]?.[field] ?? item[field];
  const isCategory = field === 'category';
  const error = isCategory && value === '';

  return (
    <TextField
      error={error}
      label={error ? '필수' : isCategory ? '카테고리' : '내용'}
      value={value}
      onChange={(e) => handleEditChange(item.content, field, e.target.value)}
      size="small"
      onKeyDown={(e) => handleEnterSave(e, item.content)}
    />
  );
};
