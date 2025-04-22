import { AddWorkReportList } from '@/components/workReportMaker/list/addTable';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { blue } from '@mui/material/colors';

import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

interface Props {
  title: string;
  allContentItems: { section: string; category: string; content: string }[];
  editingMap: Record<string, { section: string; category: string; content: string }>;
  setEditingMap: React.Dispatch<
    React.SetStateAction<Record<string, { section: string; category: string; content: string }>>
  >;
  editingKey: string | null;
  setEditingKey: (key: string) => void;
  handleEditChange: (
    originalContent: string,
    field: 'section' | 'category' | 'content',
    value: string
  ) => void;
  handleSaveEdit: (
    originalSection: string,
    originalCategory: string,
    originalContent: string
  ) => void;
  handleDelete: (section: string, category: string, content: string) => void;
  section: string;
  handleAdd: (section: string, category: string, content: string) => void;
}

export const WorkReportList = (props: Props) => {
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        {props.title}
      </Typography>
      <Table size="small" sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
            <TableCell>분류</TableCell>
            <TableCell>카테고리</TableCell>
            <TableCell>내용</TableCell>
            <TableCell align="center">CRUD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AddWorkReportList section={props.section} handleAdd={props.handleAdd} />

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
                <TableCell sx={{ width: '120px' }}>{item.section}</TableCell>
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
                  {isEditing ? (
                    <IconButton
                      onClick={() =>
                        props.handleSaveEdit(item.section, item.category, item.content)
                      }
                      size="small"
                    >
                      <SaveIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton
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
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={() => props.handleDelete(item.section, item.category, item.content)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};
