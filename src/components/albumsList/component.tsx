import React, { FC } from 'react';
import styles from './style.module.scss';
import { AlbumItem } from '../albumItem/component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { BsHeart } from 'react-icons/bs';
import { addAlbumToFavorites } from '../../redux/slices/favoriteAlbumSlice';
import { clearChecked } from '../../redux/slices/albumsSlice';
import { deleteAlbumItems } from '../../redux/thunks/albumsThunks';

type AlbumsListProps = {};

export const AlbumsList: FC<AlbumsListProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((item) => item.album.list);

  const someOneChecked = data.some((item) => item.checked === true);

  const checkedPosts = data
    .filter((item) => item.checked === true)
    .map((item) => item.id);

  const onClickAddToFavorites = () => {
    dispatch(addAlbumToFavorites(checkedPosts));
    dispatch(clearChecked());
  };

  return (
    <div className={styles.root}>
      {data.map((item) => (
        <AlbumItem {...item} key={item.id} />
      ))}

      {someOneChecked && (
        <div className={styles.action}>
          <button className={styles.button} onClick={onClickAddToFavorites}>
            Add to <BsHeart />
          </button>
          <button
            className={styles.button}
            onClick={() => dispatch(deleteAlbumItems(checkedPosts))}
          >
            Remove all
            <IoMdCheckboxOutline />
          </button>
        </div>
      )}
    </div>
  );
};
