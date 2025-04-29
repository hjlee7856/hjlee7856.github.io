import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { SortableRowProps } from '../types';
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
      onClick={() => handleEdit(item)}
      {...attributes}
    >
      <TableCell sx={{ width: '40px', padding: '0 8px' }}>
        <IconButton size="small" sx={{ cursor: 'grab' }} {...listeners}>
          <DragIndicatorIcon fontSize="small" />
        </IconButton>
      </TableCell>
      <TableCell sx={{ wordBreak: 'break-all', paddingY: 1.1 }}>
        {isEditing ? (
          <EditableCell
            item={item}
            field="category"
            editingMap={editingMap}
            handleEditChange={handleEditChange}
            handleEnterSave={handleEnterSave}
          />
        ) : (
          item.category
        )}
      </TableCell>
      <TableCell sx={{ wordBreak: 'break-all' }}>
        {isEditing ? (
          <EditableCell
            item={item}
            field="content"
            editingMap={editingMap}
            handleEditChange={handleEditChange}
            handleEnterSave={handleEnterSave}
          />
        ) : (
          item.content
        )}
      </TableCell>
      {isEditing ? (
        <ActionButtons
          item={item}
          editingKey={editingKey}
          handleSaveEdit={handleSaveEdit}
          setEditingKey={setEditingKey}
          handleMoveSection={handleMoveSection}
        />
      ) : isHover ? (
        <DeleteButton item={item} editingKey={editingKey} handleDelete={handleDelete} />
      ) : (
        <TableCell sx={{ minWidth: '150px' }} />
      )}
    </TableRow>
  );
};
