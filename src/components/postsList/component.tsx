import React, { FC } from 'react';
import styles from './style.module.scss';
import { PostItem } from '../postItem/component';
import { useAppSelector } from '../../hooks';

type PostsListProps = {};

export const PostsList: FC<PostsListProps> = (): JSX.Element => {
   const data = useAppSelector((list) => list.post.list);

   return (
      <div className={styles.root}>
         {data.map((item: any) => (
            <PostItem key={item.id} {...item} />
         ))}
      </div>
   );
};
