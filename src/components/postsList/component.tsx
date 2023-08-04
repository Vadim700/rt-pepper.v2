import React, { FC } from 'react';
import styles from './style.module.scss';
import { PostItem } from '../postItem/component';
import { useAppSelector, useAppDispatch } from '../../hooks';

type PostsListProps = {};

type Post = {
   id: number;
   userId: number;
   title: string;
   body: string;
};

export const PostsList: FC<PostsListProps> = (): JSX.Element => {
   const data = useAppSelector((list) => list.post.list);
   const [users, setUsers] = React.useState([]);

   React.useEffect(() => {
      const getName = async () => {
         const responseName = await fetch(
            'https://jsonplaceholder.typicode.com/users',
         )
            .then((res) => res.json())
            .then((user) => user.map((i: any) => i.name));

         setUsers(responseName);
      };
      getName();
   }, []);

   return (
      <div className={styles.root}>
         {data.map((item: Post) => (
            <PostItem key={item.id} {...item} onlyName={users} />
         ))}
      </div>
   );
};
