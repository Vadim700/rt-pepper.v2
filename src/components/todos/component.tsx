import React, { FC } from 'react';
import styles from './style.module.scss';
import { Todo } from './todo/component';

import { useAppSelector } from '../../hooks';

type TodosProps = {};

export const arr = Array(5)
   .fill(1)
   .map((_, i) => i);

export const Todos: FC<TodosProps> = (): JSX.Element => {
   const todos = useAppSelector((state) => state.topic.topic);
   console.log(todos);

   return (
      <div className={styles.root}>
         {arr.map((_, i) => (
            <Todo data={arr} key={i} />
         ))}
      </div>
   );
};
