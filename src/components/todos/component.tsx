import React from 'react';
import styles from './style.module.scss';
import { TodoItem } from './todo/component';

import { useAppSelector } from '../../hooks';

export const arr = Array(5)
   .fill(1)
   .map((_, i) => i);

export const TodoList: React.FC = (): JSX.Element => {
   const data = useAppSelector((state) => state.todo.list);

   return (
      <ul className={styles.root}>
         {data.map((item) => (
            <TodoItem key={item.id} {...item} />
         ))}
      </ul>
   );
};
