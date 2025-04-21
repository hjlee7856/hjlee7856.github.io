import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const WorkReportMaker = () => {
  const [reportData, setReportData] = useState<Record<string, Record<string, string[]>>>({});
  const [section, setSection] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [editingMap, setEditingMap] = useState<
    Record<string, { section: string; category: string; content: string }>
  >({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAdd = () => {
    if (!section || !category || !content) return;

    setReportData((prev) => {
      const newData = { ...prev };
      if (!newData[section]) newData[section] = {};
      if (!newData[section][category]) newData[section][category] = [];
      newData[section][category].push(content);
      return newData;
    });

    setContent('');
  };

  const handleSectionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSection(event.target.value as string);
  };

  const handleCopy = async () => {
    const text = generateText();
    await navigator.clipboard.writeText(text);
    setOpenSnackbar(true); // 토스트 알림 열기
  };

  const generateText = () => {
    return Object.entries(reportData)
      .map(([section, categories]) => {
        const sectionTitle = `*[${section}]*`;

        const categoryText = Object.entries(categories)
          .map(([cat, items]) => {
            const itemList = items.map((item) => `    ○ ${item}`).join('\n');
            return cat.trim() ? `● ${cat}\n${itemList}` : itemList;
          })
          .join('\n\n');

        return `${sectionTitle}\n${categoryText}`;
      })
      .join('\n\n')
      .trim();
  };

  const text = generateText();

  const allContentItems = Object.entries(reportData).flatMap(([section, categories]) =>
    Object.entries(categories).flatMap(([category, items]) =>
      items.map((item) => ({
        section,
        category,
        content: item,
      }))
    )
  );

  const handleDelete = (section: string, category: string, content: string) => {
    setReportData((prev) => {
      const newData = { ...prev };
      newData[section][category] = newData[section][category].filter((item) => item !== content);

      if (newData[section][category].length === 0) {
        delete newData[section][category];
      }
      if (Object.keys(newData[section]).length === 0) {
        delete newData[section];
      }
      return newData;
    });
  };

  const handleEditChange = (
    originalContent: string,
    field: 'section' | 'category' | 'content',
    value: string
  ) => {
    setEditingMap((prev) => ({
      ...prev,
      [originalContent]: {
        ...prev[originalContent],
        [field]: value,
      },
    }));
  };

  const handleSaveEdit = (
    originalSection: string,
    originalCategory: string,
    originalContent: string
  ) => {
    const newValues = editingMap[originalContent];
    if (!newValues) return;

    const { section: newSection, category: newCategory, content: newContent } = newValues;

    setReportData((prev) => {
      const newData = { ...prev };

      // 원래 위치에서 삭제
      newData[originalSection][originalCategory] = newData[originalSection][
        originalCategory
      ].filter((item) => item !== originalContent);
      if (newData[originalSection][originalCategory].length === 0) {
        delete newData[originalSection][originalCategory];
      }
      if (Object.keys(newData[originalSection]).length === 0) {
        delete newData[originalSection];
      }

      // 새 위치에 추가
      if (!newData[newSection]) newData[newSection] = {};
      if (!newData[newSection][newCategory]) newData[newSection][newCategory] = [];
      newData[newSection][newCategory].push(newContent);

      return newData;
    });

    setEditingMap((prev) => {
      const newMap = { ...prev };
      delete newMap[originalContent];
      return newMap;
    });

    setEditingKey(null);
  };

  return (
    <Box p={2}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            업무 보고 생성기
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            업무 보고를 템플릿으로 자동으로 생성 해줍니다.
          </Typography>
        </Box>

        <Box display="flex" flexDirection="row" gap={2}>
          <Box display="flex" flexDirection="column" gap={2} flex={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="금일 진행 사항 / 익일 예정 사항"
                select
                value={section}
                onChange={handleSectionChange}
                fullWidth
              >
                <MenuItem value="금일 진행 사항">금일 진행 사항</MenuItem>
                <MenuItem value="익일 예정 사항">익일 예정 사항</MenuItem>
              </TextField>
              <TextField
                label="카테고리"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={handleAdd}>
                추가
              </Button>
            </Stack>

            <Divider />

            <Box>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                항목 목록
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>금일 / 익일</TableCell>
                    <TableCell>카테고리</TableCell>
                    <TableCell>내용</TableCell>
                    <TableCell align="right">수정 / 삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allContentItems.map((item, index) => {
                    const key = `${item.section}-${item.category}-${item.content}`;
                    const isEditing = editingKey === key;
                    const currentEdit = editingMap[item.content] ?? item.content;

                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {isEditing ? (
                            <TextField
                              select
                              variant="outlined"
                              value={editingMap[item.content]?.section ?? item.section}
                              onChange={(e) =>
                                handleEditChange(item.content, 'section', e.target.value)
                              }
                              sx={{ width: '150px' }}
                              size="small"
                            >
                              <MenuItem value="금일 진행 사항">금일 진행 사항</MenuItem>
                              <MenuItem value="익일 예정 사항">익일 예정 사항</MenuItem>
                            </TextField>
                          ) : (
                            item.section
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing ? (
                            <TextField
                              variant="outlined"
                              value={editingMap[item.content]?.category ?? item.category}
                              onChange={(e) =>
                                handleEditChange(item.content, 'category', e.target.value)
                              }
                              multiline
                              sx={{ width: '150px' }}
                              size="small"
                            />
                          ) : (
                            item.category
                          )}
                        </TableCell>
                        <TableCell>
                          <TextField
                            variant="outlined"
                            value={editingMap[item.content]?.content ?? item.content}
                            onChange={(e) =>
                              handleEditChange(item.content, 'content', e.target.value)
                            }
                            multiline
                            disabled={!isEditing}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell align="right">
                          {isEditing ? (
                            <IconButton
                              onClick={() =>
                                handleSaveEdit(item.section, item.category, item.content)
                              }
                              size="small"
                            >
                              <SaveIcon fontSize="small" />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => {
                                setEditingMap((prev) => ({
                                  ...prev,
                                  [item.content]: {
                                    section: item.section,
                                    category: item.category,
                                    content: item.content,
                                  },
                                }));
                                setEditingKey(`${item.section}-${item.category}-${item.content}`);
                              }}
                              size="small"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          )}
                          <IconButton
                            onClick={() => handleDelete(item.section, item.category, item.content)}
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
          </Box>

          <Stack flex={1} direction="column" spacing={4}>
            <Box flex={1}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  보고서 미리보기
                </Typography>
                <IconButton size="small" onClick={handleCopy}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
              <TextField
                multiline
                fullWidth
                minRows={10}
                value={text}
                sx={{ borderRadius: 2, backgroundColor: '#f5f5f5' }}
                InputProps={{ readOnly: true }}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="보고서가 복사되었습니다."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default WorkReportMaker;
