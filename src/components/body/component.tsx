import React, { FC } from 'react';
import styles from './style.module.scss';
import { useAppSelector } from '../../hooks';
import { Posts } from '../posts/component';
import { TodoList } from '../todos/component';
import { Albums } from '../albums/component';

type BodyProps = {};

export const Body: FC<BodyProps> = (): JSX.Element => {
   const state = useAppSelector((a: any) => a.topic.topic);

   return (
      <main className={styles.root}>
         {state === 'posts' && <Posts />}
         {state === 'albums' && <Albums />}
         {state === 'todos' && <TodoList />}
      </main>
   );
};
