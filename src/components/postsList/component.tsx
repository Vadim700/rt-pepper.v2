import React, { FC } from 'react';
import styles from './style.module.scss';
import { Post } from '../postItem/component';

type PostsProps = {};

const arr = Array(5)
   .fill(1)
   .map((_, i) => i);

export const Posts: FC<PostsProps> = (): JSX.Element => {
   return (
      <div className={styles.root}>
         {arr.map((_, i) => (
            <Post data={arr} key={i} />
         ))}
      </div>
   );
};
