import React, { FC, useEffect, useId } from 'react';

import { BiEditAlt } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

import { ControlledCheckbox } from '../checkbox/component';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import styles from './style.module.scss';
import { useAppSelector } from '../../hooks';

type PostItemProps = {
   title?: string;
   id?: number;
   userId?: number;
   body?: string;
   name: any;
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const PostItem: FC<PostItemProps> = ({
   title,
   id,
   userId,
   body,
   name,
}): JSX.Element => {
   const [checked, setChecked] = React.useState<boolean>(true);
   const [openComment, setOpenComment] = React.useState<boolean>(false);
   const [comments, setComments] = React.useState([]);
   const limit = useAppSelector((limit) => limit.topic.limit);

   const onchange = () => {
      setChecked((checked) => !checked);
   };

   const showComments = (event: any) => {
      setOpenComment((close) => !close);
   };

   React.useEffect(() => {
      const getComments = async () => {
         const response = await fetch(
            `https://jsonplaceholder.typicode.com/comments`,
         ).then((res) => res.json());
         setComments(response);
      };
      getComments();
   }, []);

   const relevant = comments.filter((value: any) => value.postId === id);

   console.log(relevant, 'relevant');

   return (
      <article className={styles.root}>
         <div
            className={styles.post}
            style={{ borderColor: checked ? '#1976d2' : '' }}
         >
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.text}>{body}</div>
            <div className={styles.bottom}>
               <div className={styles.name}>Name</div>
               <button
                  onClick={showComments}
                  className={styles.comment}
                  value={userId}
               >
                  comments
               </button>
            </div>
            <span className={styles.checkbox}>
               <ControlledCheckbox onchange={onchange} />
            </span>
            <div className={styles.action}>
               <span style={{ marginRight: '10px' }}>id: {id}</span>
               <BiEditAlt className={styles.edit} />
               <Checkbox
                  {...label}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  className={styles.favorite}
               />
               <RxCross2 className={styles.delete} />
            </div>
         </div>
         {openComment &&
            relevant.map(
               (item: {
                  name: string;
                  email: string;
                  body: string;
                  id: number;
                  postId: number;
               }) => (
                  <div className={styles.comments}>
                     <div className={styles.comments__name}>{item.name}</div>
                     <div className={styles.comments__email}>{item.email}</div>
                     <div className={styles.comments__body}>{item.body}</div>
                     <span className={styles.comments__id}>
                        <strong>ID: {item.id}</strong>
                        <strong>postID: {item.postId}</strong>
                     </span>
                  </div>
               ),
            )}
      </article>
   );
};
