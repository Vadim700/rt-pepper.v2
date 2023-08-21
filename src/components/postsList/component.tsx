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
   const sortType = useAppSelector((type) => type.topic.sortType);
   const favorite = useAppSelector((item) => item.favorites.list).map(
      (item) => item.id,
   );

   const titleAsc = (a: Post, b: Post) => a.title.localeCompare(b.title);
   const titleDesc = (a: Post, b: Post) => b.title.localeCompare(a.title);

   const nameAsc = (a: any, b: any) => a.name.localeCompare(b.name);
   const nameDesc = (a: any, b: any) => b.name.localeCompare(a.name);

   // const isFavorite = (a: number, b: number) => a - b;

   const idAsc = (a: Post, b: Post) => a.id - b.id;
   const idDesc = (a: Post, b: Post) => b.id - a.id;

   const mySort = React.useMemo(() => {
      switch (sortType) {
         case 'idAsc':
            return [...data]
               .sort(idAsc)
               .map((item: Post) => (
                  <PostItem
                     key={item.id}
                     {...item}
                     users={users}
                     favorite={favorite}
                  />
               ));
         case 'idDesc':
            return [...data]
               .sort(idDesc)
               .map((item: Post) => (
                  <PostItem
                     key={item.id}
                     {...item}
                     users={users}
                     favorite={favorite}
                  />
               ));
         case 'titleAsc':
            return [...data]
               .sort(titleAsc)
               .map((item: Post) => (
                  <PostItem
                     key={item.id}
                     {...item}
                     users={users}
                     favorite={favorite}
                  />
               ));
         case 'titleDesc':
            return [...data]
               .sort(titleDesc)
               .map((item: Post) => (
                  <PostItem
                     key={item.id}
                     {...item}
                     users={users}
                     favorite={favorite}
                  />
               ));
      }
   }, [sortType, data, users, favorite]);

   return <ul className={styles.root}>{mySort}</ul>;
};
