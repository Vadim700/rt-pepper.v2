import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPhotos } from '../../redux/thunks/albumsThunks';

import styles from './style.module.scss';
import { Photo } from '../../types';
import { MyLoader } from '../../components/sceleton/Skeleton';

import { ModalPhoto } from '../../components/modalPhoto/component';

export const AlbumPhotos: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const data = useAppSelector((item) => item.album.photosList);
  const { loadingPhotos } = useAppSelector((item) => item.album);
  const currintAlbum = useAppSelector((item) => item.album.list).find(
    (item) => item.id === Number(id),
  );

  React.useEffect(() => {
    dispatch(fetchPhotos(String(id)));
  }, [dispatch, id]);

  return (
    <div className={styles.root}>
      <h2 className={styles.titleOfPage}> {currintAlbum?.title}</h2>
      <div className={styles.grid}>
        {data ? (
          data.map((item: Photo) => (
            <React.Fragment key={item.id}>
              {loadingPhotos === true ? (
                <MyLoader />
              ) : (
                <div className={styles.photo}>
                  <div className={styles.image}>
                    <img src={item.thumbnailUrl} alt="Превью" />
                  </div>
                  <div className={styles.modal}>
                    <ModalPhoto {...item} />
                  </div>
                  <div className={styles.title}>{item.title}</div>
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
