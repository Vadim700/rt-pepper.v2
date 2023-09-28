import React from 'react';
import { AlbumsList } from '../../components/albumsList/component';
import styles from './style.module.scss';

export const Albums = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <AlbumsList />
    </div>
  );
};
