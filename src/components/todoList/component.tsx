import React from 'react';
import styles from './style.module.scss';
import { TodoItem } from '../todoItem/component';

import { useAppSelector } from '../../hooks';

type Todo = {
   id: number;
   userId: number;
   title: string;
   completed: boolean;
};

export const TodoList: React.FC = (): JSX.Element => {
   const data = useAppSelector((state) => state.todo.list);

   return (
      <ul className={styles.root}>
         {data.map((item: Todo, key: number) => (
            <TodoItem key={key} {...item} />
         ))}
      </ul>
   );
};
