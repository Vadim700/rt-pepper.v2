import React, { FC } from 'react';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleAlbumItemChecked } from '../../redux/slices/albumsSlice';
import { deleteAlbumItem } from '../../redux/thunks/albumsThunks';
import { Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { toggleSelectedAlbumFavorite } from '../../redux/slices/favoriteAlbumSlice';
import { useWindowWidth } from '../windowWidth/useWindowWidth';

type AlbumItemProps = {
  userId: number;
  id: number;
  title: string;
  checked: boolean;
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const AlbumItem: FC<AlbumItemProps> = ({
  id,
  title,
  checked,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector((item) => item.albumFavorites.list);
  const windowWidth = useWindowWidth();

  const hasInFavorite = React.useCallback(
    (): any => favorite.includes(id),
    [favorite, id],
  );

  return (
    <article
      className={styles.root}
      style={{
        borderColor: checked ? 'tomato' : '',
      }}
    >
      <span className={styles.checkbox}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => dispatch(toggleAlbumItemChecked(id))}
          id={String(id)}
        />
        <label htmlFor={String(id)}></label>
      </span>
      <span className={styles.id}>
        <b>{id}</b>
      </span>
      <Link to={`/albums/photos/${id}`} className={styles.title}>
        {title}
      </Link>
      <div className={styles.action}>
        <Link to={`/albums/${id}`} className={styles.edit}>
          <BiEditAlt />
        </Link>
        <span className={styles.favorite}>
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            className={styles.favorite}
            onChange={() => dispatch(toggleSelectedAlbumFavorite(id))}
            checked={hasInFavorite()}
            size={windowWidth.current <= 478 ? 'small' : 'medium'}
          />
        </span>
        <button
          className={styles.delete}
          onClick={() => dispatch(deleteAlbumItem(String(id)))}
        >
          <RxCross2 />
        </button>
      </div>
    </article>
  );
};
