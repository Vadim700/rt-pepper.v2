import React, { FC } from 'react';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

import { useAppDispatch } from '../../hooks';
import { toggleAlbumItemChecked } from '../../redux/slices/albumsSlice';
import { deleteAlbumItem } from '../../redux/thunks/albumsThunks';

type AlbumItemProps = {
  userId: number;
  id: number;
  title: string;
  checked: boolean;
};

export const AlbumItem: FC<AlbumItemProps> = ({
  id,
  title,
  checked,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <article
      className={styles.root}
      style={{
        borderColor: checked ? 'tomato' : '',
        backgroundColor: checked ? 'rgba(25, 118, 210, 0.25)' : '',
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
        ID: <b>{id}</b>
      </span>
      <Link to={`/albums/photos/${id}`} className={styles.title}>
        {title}
      </Link>
      <Link to={`/albums/${id}`} className={styles.edit}>
        <BiEditAlt />
      </Link>
      <button
        className={styles.delete}
        onClick={() => dispatch(deleteAlbumItem(String(id)))}
      >
        <RxCross2 />
      </button>
    </article>
  );
};
