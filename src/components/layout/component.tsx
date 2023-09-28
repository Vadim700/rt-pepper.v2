import React, { FC } from 'react';
import styles from './style.module.scss';
import { useAppSelector } from '../../hooks';

import { Outlet } from 'react-router-dom';
import PaginationControlled from '../pagination/component';
import { Header } from '../header/component';

type LayoutProps = {};

export const Layout: FC<LayoutProps> = (): JSX.Element => {
  const { loading, error } = useAppSelector((state) => state.todo);

  return (
    <div className={styles.root}>
      <Header />

      <main className={styles.main}>
        {loading ? (
          <h2 className={styles.loading}>is Loading...</h2>
        ) : (
          <Outlet />
        )}
        {error && <h2 className={styles.error}>Error!</h2>}
      </main>
      <PaginationControlled />
    </div>
  );
};
