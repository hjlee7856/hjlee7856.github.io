import { WorkReportList } from '@/components/workReportMaker/list/list';
import { WorkReportPreview } from '@/components/workReportMaker/preview';
import { WorkReportTitle } from '@/components/workReportMaker/title';
import { useWorkReport } from '@/hooks/useWorkReport';

import { Box, Divider, Stack } from '@mui/material';

const WorkReportMaker = () => {
  const {
    handleAdd,
    allContentItems,
    editingMap,
    editingKey,
    handleEditChange,
    handleSaveEdit,
    setEditingMap,
    setEditingKey,
    handleDelete,
    text,
    resetData,
  } = useWorkReport();
  return (
    <Box p={2}>
      <Stack spacing={3}>
        <WorkReportTitle />
        <Divider />
        <Box display="flex" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box display="flex" flexDirection="column" gap={8} flex={2}>
            <WorkReportList
              allContentItems={allContentItems.filter((item) => item.section === '금일 진행 사항')}
              editingMap={editingMap}
              setEditingMap={setEditingMap}
              editingKey={editingKey}
              setEditingKey={setEditingKey}
              handleEditChange={handleEditChange}
              handleSaveEdit={handleSaveEdit}
              handleDelete={handleDelete}
              section={'금일 진행 사항'}
              handleAdd={handleAdd}
            />
            <WorkReportList
              allContentItems={allContentItems.filter((item) => item.section === '익일 예정 사항')}
              editingMap={editingMap}
              setEditingMap={setEditingMap}
              editingKey={editingKey}
              setEditingKey={setEditingKey}
              handleEditChange={handleEditChange}
              handleSaveEdit={handleSaveEdit}
              handleDelete={handleDelete}
              section={'익일 예정 사항'}
              handleAdd={handleAdd}
            />
          </Box>
          {/* PC */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 3, display: { xs: 'none', sm: 'block' } }}
          />
          {/* Mobile */}
          <Divider sx={{ my: 3, display: { xs: 'block', sm: 'none' } }} />
          <WorkReportPreview text={text} resetData={resetData} />
        </Box>
      </Stack>
    </Box>
  );
};

export default WorkReportMaker;
