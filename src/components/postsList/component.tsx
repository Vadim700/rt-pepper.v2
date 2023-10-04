import React, { FC } from 'react';
import styles from './style.module.scss';
import { PostItem } from '../postItem/component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { BsHeart } from 'react-icons/bs';
import { clearChecked } from '../../redux/slices/postsSlice';
import { addToFavorites } from '../../redux/slices/favoriteSlice';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { deletePosts } from '../../redux/thunks/postsThunks';
import { Post } from '../../types';

export const PostsList: FC = (): JSX.Element => {
  const data = useAppSelector((list) => list.post.list);
  const sortType = useAppSelector((type) => type.topic.sortPostType);
  const favorite = useAppSelector((item) => item.favorites.list);

  const dispatch = useAppDispatch();

  const titleAsc = (a: Post, b: Post) => a.title.localeCompare(b.title);
  const titleDesc = (a: Post, b: Post) => b.title.localeCompare(a.title);

  const nameAsc = (a: any, b: any) => a.name.localeCompare(b.name);
  const nameDesc = (a: any, b: any) => b.name.localeCompare(a.name);

  const idAsc = (a: Post, b: Post) => a.id - b.id;
  const idDesc = (a: Post, b: Post) => b.id - a.id;

  const isCkecked = data.some((item) => item.checked === true);

  const checkedPosts = data
    .filter((item) => item.checked === true)
    .map((item) => item.id);

  const onClickAddToFavorites = () => {
    dispatch(addToFavorites(checkedPosts));
    dispatch(clearChecked());
  };

  const mySort = React.useMemo(() => {
    switch (sortType) {
      case 'idAsc':
        return [...data]
          .sort(idAsc)
          .map((item: Post) => (
            <PostItem key={item.id} {...item} favorite={favorite} />
          ));
      case 'idDesc':
        return [...data]
          .sort(idDesc)
          .map((item: Post) => (
            <PostItem key={item.id} {...item} favorite={favorite} />
          ));
      case 'titleAsc':
        return [...data]
          .sort(titleAsc)
          .map((item: Post) => (
            <PostItem key={item.id} {...item} favorite={favorite} />
          ));
      case 'titleDesc':
        return [...data]
          .sort(titleDesc)
          .map((item: Post) => (
            <PostItem key={item.id} {...item} favorite={favorite} />
          ));
      case 'nameAsc':
        return [...data]
          .sort(nameAsc)
          .map((item: Post) => (
            <PostItem key={item.id} {...item} favorite={favorite} />
          ));
      case 'nameDesc':
        return [...data]
          .sort(nameDesc)
          .map((item: Post) => (
            <PostItem key={item.id} {...item} favorite={favorite} />
          ));
    }
  }, [sortType, data, favorite]);

  return (
    <ul className={styles.root}>
      <>
        {mySort}
        {isCkecked && (
          <div className={styles.action}>
            <button className={styles.button} onClick={onClickAddToFavorites}>
              Add to <BsHeart />
            </button>
            <button
              className={styles.button}
              onClick={() => dispatch(deletePosts(checkedPosts))}
            >
              Remove
              <IoMdCheckboxOutline />
            </button>
          </div>
        )}
      </>
    </ul>
  );
};
