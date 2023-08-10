import React, { FC } from 'react';
import styles from './style.module.scss';
import { PostItem } from '../postItem/component';
import { useAppSelector } from '../../hooks';

type PostsListProps = {};

type Post = {
   id: number;
   userId: number;
   title: string;
   body: string;
};

export const PostsList: FC<PostsListProps> = (): JSX.Element => {
   const users = useAppSelector((user) => user.user.list);
   const data = useAppSelector((list) => list.post.list);

   return (
      <div className={styles.root}>
         {data.map((item: Post) => (
            <PostItem key={item.id} {...item} users={users} />
         ))}
      </div>
   );
};
