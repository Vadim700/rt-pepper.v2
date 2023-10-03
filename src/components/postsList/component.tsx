import React, { FC } from 'react';
import styles from './style.module.scss';
import { PostItem } from '../postItem/component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { BsHeart } from 'react-icons/bs';
import { deletePosts } from '../../redux/slices/postsSlice';

type PostsListProps = {};

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  name: string;
  checked: boolean;
};

export const PostsList: FC<PostsListProps> = (): JSX.Element => {
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
            <button
              className={styles.button}
              onClick={() => dispatch(deletePosts(checkedPosts))}
            >
              Remove
            </button>
            <button className={styles.button}>
              Add to <BsHeart />
            </button>
          </div>
        )}
      </>
    </ul>
  );
};
