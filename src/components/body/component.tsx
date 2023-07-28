import React, { FC } from 'react';
import styles from './style.module.scss';
import { useAppSelector } from '../../hooks';
import { Posts } from '../postsList/component';
import { TodoList } from '../todoList/component';
import { Albums } from '../albumsList/component';
import PaginationControlled from '../pagination/component';

type BodyProps = {};

export const Body: FC<BodyProps> = (): JSX.Element => {
   const state = useAppSelector((a: any) => a.topic.topic);

   return (
      <main className={styles.root}>
         {state === 'posts' && <Posts />}
         {state === 'albums' && <Albums />}
         {state === 'todos' && <TodoList />}
         <div className={styles.pagination}>
            <PaginationControlled />
         </div>
      </main>
   );
};
