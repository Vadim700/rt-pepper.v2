import React, { FC, useCallback, useMemo } from 'react';

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
import { addFavorites, removeFavorite } from '../../redux/slices/favoriteSlice';

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
   users: any;
   favorite: number[];
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const PostItem: FC<PostItemProps> = ({
   title,
   id,
   userId,
   body,
   users,
   favorite,
}): JSX.Element => {
   const dispatch = useAppDispatch();
   const comments = useAppSelector((comment) => comment.comment.list);
   const [checked, setChecked] = React.useState<boolean>(false);
   const [openComment, setOpenComment] = React.useState<boolean>(false);
   const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

   const name = users.filter(
      (_: any, key: any) =>
         String(key).split('').pop() === String(id).split('').pop(),
   );

   const hasInFavorite = React.useCallback(
      (): any => favorite.includes(id),
      [favorite, id],
   );

   const onFavoreteChange = useCallback(() => {
      setIsFavorite((isFavorite) => !isFavorite);

      !isFavorite
         ? dispatch(addFavorites({ title, id, userId, body }))
         : dispatch(removeFavorite({ id }));
   }, [body, dispatch, id, isFavorite, title, userId]);

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
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.text}>{body}</div>
            <div className={styles.bottom}>
               <div className={styles.name}>{name}</div>
               <button
                  onClick={showComments}
                  className={styles.comment}
                  value={userId}
                  style={style.comment}
               >
                  comments
               </button>
            </div>
            <span className={styles.checkbox}>
               <input
                  type="checkbox"
                  onChange={() => setChecked((checked) => !checked)}
               />
            </span>
            <div className={styles.action}>
               <span style={{ marginRight: '10px' }}>id: {id}</span>

               <Link to={`/${id}`}>
                  <BiEditAlt className={styles.edit} />
               </Link>

               <Checkbox
                  {...label}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  className={styles.favorite}
                  onChange={onFavoreteChange}
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
