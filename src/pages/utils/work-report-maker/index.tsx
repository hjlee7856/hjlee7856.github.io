import PageLayout from '@/components/util/pageLayout';
import { PageTitle } from '@/components/util/pageTitle';
import { WorkReportPreview } from '@/components/workReportMaker/preview';
import { WorkReportList } from '@/components/workReportMaker/table/table';
import { useWorkReport } from '@/hooks/useWorkReport';

import { Box, Divider } from '@mui/material';

const TITLE = '업무 보고 생성기';
const SUB_TITLE =
  '업무 보고를 템플릿으로 자동으로 생성 해줍니다. \n 로그인하면 클라우드에 저장됩니다.';

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
    handleOrderChange,
  } = useWorkReport();

  return (
    <PageLayout>
      <PageTitle title={TITLE} subTitle={SUB_TITLE} />
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
            handleOrderChange={handleOrderChange}
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
            handleOrderChange={handleOrderChange}
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
    </PageLayout>
  );
};

export default WorkReportMaker;
