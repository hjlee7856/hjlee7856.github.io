import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, IconButton, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { SECTION_TYPES, SortableRowProps } from '../types';
import { ActionButtons } from './ActionButtons';
import { DeleteButton } from './DeleteButton';
import { EditableCell } from './EditableCell';

export const SortableRow = ({
  item,
  index,
  isEditing,
  isHover,
  rowRef,
  setHoverIndex,
  handleEdit,
  handleDelete,
  handleMoveSection,
  editingMap,
  handleEditChange,
  handleSaveEdit,
  handleEnterSave,
  editingKey,
  setEditingKey,
}: SortableRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.content,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      ref={isEditing ? rowRef : setNodeRef}
      component="tr"
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(null)}
      sx={{ cursor: 'pointer', ...style }}
      hover={true}
      selected={isEditing}
      onClick={(e) => {
        e.stopPropagation();
        handleEdit(item);
      }}
      {...attributes}
    >
      <TableCell sx={{ width: { xs: '32px', sm: '40px' } }}>
        <Tooltip title="드래그로 순서 변경">
          <IconButton size="small" sx={{ cursor: 'grab' }} {...listeners}>
            <DragIndicatorIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell
        sx={{
          wordBreak: 'break-all',
          minWidth: { xs: '120px', sm: '160px', md: '200px' },
          maxWidth: { xs: '200px', sm: '250px', md: '300px' },
        }}
      >
        {isEditing ? (
          <EditableCell
            item={item}
            field="category"
            editingMap={editingMap}
            handleEditChange={handleEditChange}
            handleEnterSave={handleEnterSave}
          />
        ) : (
          <Tooltip title="클릭해서 수정">
            <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              {item.category}
            </Typography>
          </Tooltip>
        )}
      </TableCell>
      <TableCell
        sx={{
          wordBreak: 'break-all',
          minWidth: { xs: '200px', sm: '300px', md: '400px' },
          maxWidth: { xs: '300px', sm: '400px', md: '600px' },
        }}
      >
        {isEditing ? (
          <EditableCell
            item={item}
            field="content"
            editingMap={editingMap}
            handleEditChange={handleEditChange}
            handleEnterSave={handleEnterSave}
          />
        ) : (
          <Tooltip title="클릭해서 수정">
            <Typography sx={{ whiteSpace: 'pre-wrap', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              {item.content}
            </Typography>
          </Tooltip>
        )}
      </TableCell>
      <TableCell sx={{ minWidth: { xs: '80px', sm: '100px' } }} align="right">
        {isEditing ? (
          <ActionButtons
            item={item}
            editingKey={editingKey}
            handleSaveEdit={handleSaveEdit}
            setEditingKey={setEditingKey}
            handleMoveSection={handleMoveSection}
          />
        ) : (
          <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
            {item.section === SECTION_TYPES.TODAY && (
              <Tooltip title="익일로 이동">
                <IconButton
                  onClick={(e) => handleMoveSection(e, item.content, SECTION_TYPES.TOMORROW)}
                  size="small"
                >
                  <ArrowDownwardIcon fontSize="small" color="primary" />
                </IconButton>
              </Tooltip>
            )}
            {item.section === SECTION_TYPES.TOMORROW && (
              <Tooltip title="금일로 이동">
                <IconButton
                  onClick={(e) => handleMoveSection(e, item.content, SECTION_TYPES.TODAY)}
                  size="small"
                >
                  <ArrowUpwardIcon fontSize="small" color="primary" />
                </IconButton>
              </Tooltip>
            )}
            <DeleteButton item={item} editingKey={editingKey} handleDelete={handleDelete} />
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
};
