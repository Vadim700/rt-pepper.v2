import React, { FC } from 'react';

import { BiEditAlt } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchComments } from '../../redux/slices/commentSlice';
import { deletePost } from '../../redux/slices/postsSlice';
import { Link } from 'react-router-dom';
import { toggleSelectedFavorite } from '../../redux/slices/favoriteSlice';
import { BsBoxArrowDown } from 'react-icons/bs';

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type PostItemProps = {
  title: string;
  id: number;
  userId: number;
  body: string;
  name: string;
  favorite: any;
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const PostItem: FC<PostItemProps> = ({
  title,
  id,
  userId,
  body,
  name,
  favorite,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((comment) => comment.comment.list);
  const [checked, setChecked] = React.useState<boolean>(false);
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
        style={{ borderColor: checked ? '#1976d2' : '' }}
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
            onChange={() => setChecked((checked) => !checked)}
          />
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
        comments.map((item: Comment) => (
          <div className={styles.comments} key={item.id}>
            <div className={styles.comments__name}>{item.name}</div>
            <div className={styles.comments__email}>{item.email}</div>
            <div className={styles.comments__body}>{item.body}</div>
            <span className={styles.comments__id}>
              <strong>ID: {item.id}</strong>
              <strong>postID: {item.postId}</strong>
            </span>
          </div>
        ))}
    </article>
  );
};
