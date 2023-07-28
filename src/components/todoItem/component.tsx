import React, { FC } from 'react';
import styles from './style.module.scss';

import { useAppDispatch } from '../../hooks';
import { deleteTodo } from '../../redux/slices/todoSlice';

type TodoItemProps = {
   id: number;
   title: string;
   completed: boolean;
};

export const TodoItem: FC<TodoItemProps> = ({
   id,
   title,
   completed,
}): JSX.Element => {
   const dispatch = useAppDispatch();

   return (
      <li className={styles.root}>
         <div className={styles.title}>{title}</div>
         <button
            onClick={() => dispatch(deleteTodo(String(id)))}
            className={styles.delete}
         >
            X
         </button>
      </li>
   );
};
