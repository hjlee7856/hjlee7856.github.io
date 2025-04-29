import { AddWorkReportList } from '@/components/workReportMaker/table/addTable';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

interface Props {
  allContentItems: Report[];
  editingMap: Record<string, Report>;
  setEditingMap: React.Dispatch<React.SetStateAction<Record<string, Report>>>;
  editingKey: string | null;
  setEditingKey: (key: string | null) => void;
  handleEditChange: (
    originalContent: string,
    field: 'section' | 'category' | 'content',
    value: string
  ) => void;
  handleSaveEdit: (
    originalContent: string,
    overrideSection?: string // 새로운 섹션으로 이동하고 싶을 때 사용
  ) => void;
  handleDelete: (section: string, category: string, content: string) => void;
  section: string;
  handleAdd: (section: string, category: string, content: string) => void;
}

type Report = { section: string; category: string; content: string };

export const WorkReportList = (props: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const rowRef = useRef<HTMLTableRowElement | null>(null);

  const handleEdit = (item: Report) => {
    props.setEditingMap((prev) => ({
      ...prev,
      [item.content]: {
        section: item.section,
        category: item.category,
        content: item.content,
      },
    }));
    props.setEditingKey(`${item.section}-${item.category}-${item.content}`);
  };

  const handleEnterSave = (e: KeyboardEvent<HTMLDivElement>, content: string) => {
    if (e.key === 'Enter') {
      props.handleSaveEdit(content);
      props.setEditingKey(null);
    }
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

  return (
    <Box sx={{ overflowX: 'auto', minHeight: '200px' }}>
      <Box display={'flex'} alignItems={'center'}>
        <Typography variant="subtitle1" fontWeight="bold">
          {props.section}
        </Typography>
        <Tooltip title={'추가하기'}>
          <IconButton
            onClick={() => {
              setIsAdding(true);
            }}
            size="small"
          >
            <AddIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
      <Table size="small" sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
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
            />
          )}

          {props.allContentItems.map((item, index) => {
            const key = `${item.section}-${item.category}-${item.content}`;
            const isEditing = props.editingKey === key;
            const isHover = hoverIndex === index;

            const rowContent = (
              <TableRow
                ref={isEditing ? rowRef : null}
                component="tr"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                sx={{ cursor: 'pointer' }}
                hover={true}
                selected={isEditing}
                onClick={() => handleEdit(item)}
              >
                <TableCell sx={{ wordBreak: 'break-all', paddingY: 1.1 }}>
                  {isEditing ? (
                    <TextField
                      error={props.editingMap[item.content]?.category === ''}
                      label={props.editingMap[item.content]?.category === '' ? '필수' : '카테고리'}
                      value={props.editingMap[item.content]?.category ?? item.category}
                      onChange={(e) =>
                        props.handleEditChange(item.content, 'category', e.target.value)
                      }
                      size="small"
                      onKeyDown={(e) => handleEnterSave(e, item.content)}
                    />
                  ) : (
                    <Typography>{item.category}</Typography>
                  )}
                </TableCell>
                <TableCell sx={{ wordBreak: 'break-all' }}>
                  {isEditing ? (
                    <TextField
                      label={'내용'}
                      value={props.editingMap[item.content]?.content ?? item.content}
                      onChange={(e) =>
                        props.handleEditChange(item.content, 'content', e.target.value)
                      }
                      size="small"
                      onKeyDown={(e) => handleEnterSave(e, item.content)}
                    />
                  ) : (
                    <Typography>{item.content}</Typography>
                  )}
                </TableCell>
                {isEditing && (
                  <TableCell align="right" sx={{ minWidth: '150px' }}>
                    <Tooltip title="저장">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          props.handleSaveEdit(item.content);
                          props.setEditingKey(null);
                        }}
                        size="small"
                      >
                        <CheckIcon fontSize="small" color="success" />
                      </IconButton>
                    </Tooltip>
                    {item.section === '금일 진행 사항' && (
                      <Tooltip title="익일로 이동">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            props.handleEditChange(item.content, 'section', '익일 예정 사항');
                            props.handleSaveEdit(item.content, '익일 예정 사항');
                            props.setEditingKey(null);
                          }}
                          size="small"
                        >
                          <SouthIcon fontSize="small" color="primary" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {item.section === '익일 예정 사항' && (
                      <Tooltip title="금일로 이동">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            props.handleEditChange(item.content, 'section', '금일 진행 사항');
                            props.handleSaveEdit(item.content, '금일 진행 사항');
                            props.setEditingKey(null);
                          }}
                          size="small"
                        >
                          <NorthIcon fontSize="small" color="primary" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
                {isHover && !isEditing && (
                  <TableCell align="right" sx={{ minWidth: '150px' }}>
                    <Tooltip title="삭제">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          props.handleDelete(item.section, item.category, item.content);
                          props.setEditingKey(null);
                        }}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
                {!isHover && !isEditing && <TableCell sx={{ minWidth: '150px' }} />}
              </TableRow>
            );

            // 툴팁은 편집 중이 아닐 때만 감쌈
            return isEditing ? (
              rowContent
            ) : (
              <Tooltip title="클릭해서 수정" arrow key={key}>
                {rowContent}
              </Tooltip>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};
