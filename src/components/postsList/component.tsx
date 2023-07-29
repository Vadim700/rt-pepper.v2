import React, { FC } from 'react';
import styles from './style.module.scss';
import { PostItem } from '../postItem/component';
// import { useAppSelector } from '../../hooks';

type PostsListProps = {};

export const PostsList: FC<PostsListProps> = (): JSX.Element => {
   // const data = useAppSelector(list => list.);
   const [data, setData] = React.useState([]);

   React.useEffect(() => {
      const getData = fetch(
         'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10',
      )
         .then((res) => res.json())
         .then((json) => setData(json));
   }, []);

   return (
      <div className={styles.root}>
         {data.map((item: { id: number; item: any }) => (
            <PostItem key={item.id} {...item} />
         ))}
      </div>
   );
};
