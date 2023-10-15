import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from './style.module.scss';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPageNumber } from '../../redux/slices/topicSlice';
import { createPortal } from 'react-dom';

export const PaginationControlled = () => {
  const [page, setPage] = React.useState(1);

  const limit = useAppSelector((item) => item.topic.limit);
  const topic = useAppSelector((item) => item.topic.topic);

  const dispatch = useAppDispatch();

  const pagination = document.getElementById('pagination');
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(setPageNumber(value));
  };

  const fetchDataLength = useAppSelector((item) => item.post.length);

  const items = React.useCallback(() => {
    switch (topic) {
      case 'albums':
        return fetchDataLength[1] / limit;

      case 'todos':
        return fetchDataLength[2] / limit;

      default:
        return fetchDataLength[0] / limit;
    }
  }, [fetchDataLength, limit, topic]);

  return (
    <>
      {pagination &&
        createPortal(
          // что вставляем
          <Stack spacing={2} className={styles.pagination}>
            {' '}
            <Pagination count={items()} page={page} onChange={handleChange} />
          </Stack>,
          pagination, // куда вставляем
        )}
    </>
  );
};
