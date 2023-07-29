import React from 'react';
import styles from './style.module.scss';
import { TodoItem } from '../todoItem/component';

import { useAppSelector } from '../../hooks';

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
