import { Box, Skeleton, Table, TableBody, TableCell, TableRow } from '@mui/material';

const WorkReportListSkeleton = () => {
  return (
    <Table>
      <TableBody>
        {[...Array(5)].map((_, idx) => (
          <TableRow key={idx}>
            <TableCell width="30%">
              <Skeleton variant="text" width="80%" height={24} />
            </TableCell>
            <TableCell width="50%">
              <Skeleton variant="text" width="95%" height={24} />
            </TableCell>
            <TableCell width="20%">
              <Box display="flex" gap={1}>
                <Skeleton variant="rectangular" width={32} height={32} />
                <Skeleton variant="rectangular" width={32} height={32} />
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WorkReportListSkeleton;
