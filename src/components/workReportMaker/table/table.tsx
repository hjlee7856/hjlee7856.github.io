import { AddWorkReportList } from '@/components/workReportMaker/table/addTable';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { SortableRow } from './components/SortableRow';
import { Props, Report } from './types';
import WorkReportListSkeleton from './WorkReportListSkeleton';

export const WorkReportList = (props: Props & { isLoading?: boolean }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const rowRef = useRef<HTMLTableRowElement>(null);
  const [items, setItems] = useState<Report[]>(props.allContentItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setItems(props.allContentItems);
  }, [props.allContentItems]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.content === active.id);
      const newIndex = items.findIndex((item) => item.content === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      props.handleOrderChange(
        newItems.map((item) => ({
          section: item.section,
          category: item.category,
          content: item.content,
        }))
      );
    }
  };

  const handleEdit = (item: Report) => {
    props.setEditingMap((prev) => ({
      ...prev,
      [item.content]: { ...item },
    }));
    props.setEditingKey(`${item.section}-${item.category}-${item.content}`);
  };

  const handleEnterSave = (e: KeyboardEvent<HTMLDivElement>, content: string) => {
    if (e.key === 'Enter') {
      props.handleSaveEdit(content);
      props.setEditingKey(null);
    }
  };

  const handleMoveSection = (e: React.MouseEvent, content: string, targetSection: string) => {
    e.stopPropagation();
    props.handleSaveEdit(content, targetSection);
  };

  const handleDelete = (e: React.MouseEvent, item: Report) => {
    e.stopPropagation();
    props.handleDelete(item.section, item.category, item.content);
    props.setEditingKey(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (props.editingKey && rowRef.current && !rowRef.current.contains(event.target as Node)) {
        props.setEditingKey(null);
      }
    };

    if (props.editingKey) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props.editingKey]);

  if (props.isLoading) return <WorkReportListSkeleton />;

  return (
    <Box sx={{ overflowX: 'auto', minHeight: '200px' }}>
      <Box display={'flex'} alignItems={'center'}>
        <Typography variant="subtitle1" fontWeight="bold">
          {props.section}
        </Typography>
        <Tooltip title={'추가하기'}>
          <IconButton onClick={() => setIsAdding(true)} size="small">
            <AddIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Table size="small" sx={{ minWidth: 300 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '40px' }}></TableCell>
              <TableCell>카테고리</TableCell>
              <TableCell>내용</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isAdding && (
              <AddWorkReportList
                section={props.section}
                handleAdd={props.handleAdd}
                setIsAdding={setIsAdding}
                allContentItems={props.allContentItems}
              />
            )}
            <SortableContext
              items={items.map((item) => item.content)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item, index) => {
                const key = `${item.section}-${item.category}-${item.content}`;
                const isEditing = props.editingKey === key;
                const isHover = hoverIndex === index;

                return (
                  <SortableRow
                    key={key}
                    item={item}
                    index={index}
                    isEditing={isEditing}
                    isHover={isHover}
                    rowRef={rowRef}
                    setHoverIndex={setHoverIndex}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleMoveSection={handleMoveSection}
                    editingMap={props.editingMap}
                    handleEditChange={props.handleEditChange}
                    handleSaveEdit={props.handleSaveEdit}
                    handleEnterSave={handleEnterSave}
                    editingKey={props.editingKey}
                    setEditingKey={props.setEditingKey}
                  />
                );
              })}
            </SortableContext>
          </TableBody>
        </Table>
      </DndContext>
    </Box>
  );
};
