import PageLayout from '@/components/util/pageLayout';
import { PageTitle } from '@/components/util/pageTitle';

const TITLE = '점심 메뉴 추천기';
const SUB_TITLE = '간단한 문항을 통해 오늘 메뉴를 추천받아 보세요.';

const TodayMenuRecommender = () => {
  return (
    <PageLayout>
      <PageTitle title={TITLE} subTitle={SUB_TITLE} />
    </PageLayout>
  );
};

export default TodayMenuRecommender;
