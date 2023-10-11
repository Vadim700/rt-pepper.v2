import React, { FC, useCallback } from 'react';
import styles from './style.module.scss';
import { AlbumItem } from '../albumItem/component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { BsHeart } from 'react-icons/bs';
import { addAlbumToFavorites } from '../../redux/slices/favoriteAlbumSlice';
import { clearChecked } from '../../redux/slices/albumsSlice';
import { deleteAlbumItems } from '../../redux/thunks/albumsThunks';
import { Album } from '../../types';

type AlbumsListProps = {
  value: string;
  sortType: string;
};

export const AlbumsList: FC<AlbumsListProps> = ({
  value,
  sortType,
}): JSX.Element => {
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

  const titleAsc = useCallback(
    (a: Album, b: Album) => a.title.localeCompare(b.title),
    [],
  );

  const titleDesc = useCallback(
    (a: Album, b: Album) => b.title.localeCompare(a.title),
    [],
  );

  const idAsc = useCallback((a: Album, b: Album) => a.id - b.id, []);
  const idDesc = useCallback((a: Album, b: Album) => b.id - a.id, []);

  const editedList = useCallback(() => {
    switch (sortType) {
      case 'titleDesc': {
        return [...data]
          .sort(titleDesc)
          .filter((item) =>
            item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
          )
          .map((item) => <AlbumItem {...item} key={item.id} />);
      }
      case 'idAsc': {
        return [...data]
          .sort(idAsc)
          .filter((item) =>
            item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
          )
          .map((item) => <AlbumItem {...item} key={item.id} />);
      }
      case 'idDesc': {
        return [...data]
          .sort(idDesc)
          .filter((item) =>
            item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
          )
          .map((item) => <AlbumItem {...item} key={item.id} />);
      }
      default: {
        return [...data]
          .sort(titleAsc)
          .filter((item) =>
            item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
          )
          .map((item) => <AlbumItem {...item} key={item.id} />);
      }
    }
  }, [data, idAsc, idDesc, sortType, titleAsc, titleDesc, value]);

  return (
    <div className={styles.root}>
      {editedList()}

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
