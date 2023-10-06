import React, { FC } from 'react';
import styles from './style.module.scss';
import { AlbumItem } from '../albumItem/component';
import { useAppSelector } from '../../hooks';

type AlbumsListProps = {};

export const AlbumsList: FC<AlbumsListProps> = (): JSX.Element => {
  const data = useAppSelector((item) => item.album.list);

  return (
    <div className={styles.root}>
      {data.map((item) => (
        <AlbumItem {...item} key={item.id} />
      ))}
    </div>
  );
};
