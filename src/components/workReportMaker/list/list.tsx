import DropDownMenu from '@/components/dropdownMenu';
import { AddWorkReportList } from '@/components/workReportMaker/list/addTable';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NorthIcon from '@mui/icons-material/North';
import SaveIcon from '@mui/icons-material/Save';
import SouthIcon from '@mui/icons-material/South';
import {
  Box,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';

interface Props {
  allContentItems: { section: string; category: string; content: string }[];
  editingMap: Record<string, { section: string; category: string; content: string }>;
  setEditingMap: React.Dispatch<
    React.SetStateAction<Record<string, { section: string; category: string; content: string }>>
  >;
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

export const WorkReportList = (props: Props) => {
  const [isAdding, setIsAdding] = useState(false);
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
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Table size="small" sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
            <TableCell>카테고리</TableCell>
            <TableCell>내용</TableCell>
            <TableCell align="center">메뉴</TableCell>
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
            return (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: isEditing ? blue[50] : '',
                }}
              >
                <TableCell sx={{ wordBreak: 'break-all' }}>
                  {isEditing ? (
                    <TextField
                      error={props.editingMap[item.content]?.category === ''}
                      label={props.editingMap[item.content]?.category === '' ? '필수' : '카테고리'}
                      value={props.editingMap[item.content]?.category ?? item.category}
                      onChange={(e) =>
                        props.handleEditChange(item.content, 'category', e.target.value)
                      }
                      multiline
                      fullWidth
                      size="small"
                    />
                  ) : (
                    item.category
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
                      multiline
                      fullWidth
                      disabled={!isEditing}
                      size="small"
                    />
                  ) : (
                    item.content
                  )}
                </TableCell>
                <TableCell align="center">
                  <DropDownMenu
                    menuBtn={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    menuItems={[
                      isEditing && item.section === '금일 진행 사항' && (
                        <MenuItem
                          key="to-tomorrow"
                          onClick={() => {
                            props.handleEditChange(item.content, 'section', '익일 예정 사항');
                            props.handleSaveEdit(item.content, '익일 예정 사항');
                          }}
                        >
                          <SouthIcon fontSize="small" sx={{ mr: 1 }} />
                          익일로 이동
                        </MenuItem>
                      ),
                      isEditing && item.section === '익일 예정 사항' && (
                        <MenuItem
                          key="to-today"
                          onClick={() => {
                            props.handleEditChange(item.content, 'section', '금일 진행 사항');
                            props.handleSaveEdit(item.content, '금일 진행 사항');
                          }}
                        >
                          <NorthIcon fontSize="small" sx={{ mr: 1 }} />
                          금일로 이동
                        </MenuItem>
                      ),
                      isEditing ? (
                        <MenuItem
                          key="save"
                          onClick={() => {
                            props.handleSaveEdit(item.content);
                            props.setEditingKey(null);
                          }}
                        >
                          <SaveIcon fontSize="small" sx={{ mr: 1 }} />
                          저장
                        </MenuItem>
                      ) : (
                        <MenuItem
                          key="edit"
                          onClick={() => {
                            props.setEditingMap((prev) => ({
                              ...prev,
                              [item.content]: {
                                section: item.section,
                                category: item.category,
                                content: item.content,
                              },
                            }));
                            props.setEditingKey(`${item.section}-${item.category}-${item.content}`);
                          }}
                        >
                          <EditIcon fontSize="small" sx={{ mr: 1 }} />
                          수정
                        </MenuItem>
                      ),
                      <MenuItem
                        key="delete"
                        onClick={() =>
                          props.handleDelete(item.section, item.category, item.content)
                        }
                      >
                        <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                        삭제
                      </MenuItem>,
                    ]}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};
