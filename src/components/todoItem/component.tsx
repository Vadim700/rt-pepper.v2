import React, { FC } from 'react';
import styles from './style.module.scss';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteTodo } from '../../redux/slices/todoSlice';
import { RxCross2 } from 'react-icons/rx';

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
      <li
         className={styles.root}
         style={{ borderColor: completed ? 'green' : 'tomato' }}
      >
         <div className={styles.title}>{title}</div>
         <button
            onClick={() => dispatch(deleteTodo(String(id)))}
            className={styles.delete}
         >
            <RxCross2 />
         </button>
      </li>
   );
};
