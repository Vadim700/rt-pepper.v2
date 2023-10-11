import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPhotos } from '../../redux/thunks/albumsThunks';

import styles from './style.module.scss';
import { Photo } from '../../types';

export const AlbumPhotos: FC = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector((item) => item.album.photosList);

  const currintAlbum = useAppSelector((item) => item.album.list).find(
    (item) => item.id === Number(id),
  );

  React.useEffect(() => {
    dispatch(fetchPhotos(String(id)));
  }, [dispatch, id]);

  return (
    <div className={styles.root}>
      <h2> Photos of {currintAlbum?.title}</h2>
      <div className={styles.grid}>
        {data.map((item: Photo) => (
          <div className={styles.photo} key={item.id}>
            <div className={styles.image}>
              <img src={item.thumbnailUrl} alt="" />
            </div>
            <div className={styles.title}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
