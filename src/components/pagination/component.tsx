import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from './style.module.scss';

import { useAppDispatch } from '../../hooks';
import { setPageNumber } from '../../redux/slices/topicSlice';

export default function PaginationControlled() {
   const dispatch = useAppDispatch();

   const [page, setPage] = React.useState(1);
   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      dispatch(setPageNumber(value));
   };

   return (
      <Stack spacing={2} className={styles.pagination}>
         <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
   );
}
