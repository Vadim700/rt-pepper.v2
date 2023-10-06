import React, { FC } from 'react';
import styles from './style.module.scss';

import { BiEditAlt } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { togglePostItemChecked } from '../../redux/slices/postsSlice';
import { Link } from 'react-router-dom';

import { BsBoxArrowDown } from 'react-icons/bs';
import { toggleSelectedFavorite } from '../../redux/slices/favoriteSlice';
import { fetchComments } from '../../redux/thunks/commentsThunks';
import { deletePost } from '../../redux/thunks/postsThunks';

type PostItemProps = {
  title: string;
  id: number;
  userId: number;
  body: string;
  name: string;
  favorite: number[];
  checked: boolean;
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const PostItem: FC<PostItemProps> = ({
  title,
  id,
  userId,
  body,
  name,
  favorite,
  checked,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((comment) => comment.comment.list);
  const [openComment, setOpenComment] = React.useState<boolean>(false);

  const hasInFavorite = React.useCallback(
    (): any => favorite.includes(id),
    [favorite, id],
  );

  const showComments = React.useCallback(() => {
    setOpenComment((close) => !close);
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const style = {
    comment: {
      backgroundColor: openComment ? '#1976d2' : '',
      color: openComment ? 'white' : '',
      borderColor: openComment ? '#1976d2' : '',
    },
  };

  return (
    <article className={styles.root}>
      <div
        className={styles.post}
        style={{
          borderColor: checked ? 'tomato' : '',
          // backgroundColor: checked ? 'rgba(25, 118, 210, 0.25)' : '',
        }}
      >
        <div className={styles.name}>{name}</div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.text}>{body}</div>
        <button
          onClick={showComments}
          className={styles.comment}
          value={userId}
          style={style.comment}
        >
          {openComment ? 'Close' : 'Show'} comments
          <span
            style={{
              color: openComment ? '#fff' : 'var(--blue)',
              transform: openComment
                ? 'rotate(180deg) translateY(3px)'
                : 'translateY(2px)',
            }}
          >
            <BsBoxArrowDown />
          </span>
        </button>
        <span className={styles.checkbox}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => dispatch(togglePostItemChecked(id))}
            id={String(id)}
          />
          <label htmlFor={String(id)}></label>
        </span>
        <span className={styles.postNumber}>ID: {id}</span>
        <div className={styles.action}>
          <Link to={`/${id}`}>
            <BiEditAlt className={styles.edit} />
          </Link>

          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            className={styles.favorite}
            onChange={() => dispatch(toggleSelectedFavorite(id))}
            checked={hasInFavorite()}
          />
          <RxCross2
            className={styles.delete}
            onClick={() => dispatch(deletePost(String(id)))}
          />
        </div>
      </div>
      {openComment &&
        comments.map((item: any) => (
          <div className={styles.comments} key={item.id}>
            <div className={styles.comments__name}>{item.name}</div>
            <div className={styles.comments__body}>{item.body}</div>
            <div className={styles.comments__email}>{item.email}</div>
            <span className={styles.comments__id}>
              <strong>ID: {item.id}</strong>
              <strong>postID: {item.postId}</strong>
            </span>
          </div>
        ))}
    </article>
  );
};
