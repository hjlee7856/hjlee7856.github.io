import { categories } from '@/constants/categorys';
import { Box, Tab, Tabs } from '@mui/material';

interface Props {
  changeCategory: (e: React.SyntheticEvent, idx: number) => void;
  setCurrentPage: (page: number) => void;
  value: number;
}

export const CategoryTab = ({ changeCategory, value, setCurrentPage }: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Tabs
        value={value}
        onChange={(e, idx) => {
          changeCategory(e, idx);
          setCurrentPage(1);
        }}
        variant="scrollable"
      >
        {categories.map((category, idx) => (
          <Tab key={idx} label={category.categoryName} />
        ))}
      </Tabs>
    </Box>
  );
};
