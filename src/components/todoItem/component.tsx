import React, { FC } from 'react';
import styles from './style.module.scss';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';

import { deleteTodo, toggleStatus } from '../../redux/slices/todoSlice';
import { RxCross2 } from 'react-icons/rx';
import { Switch } from '@mui/material';
import { BiEditAlt } from 'react-icons/bi';

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

   const handleClick = (e: any) => {};

   return (
      <li
         className={styles.root}
         style={{ borderColor: completed ? 'green' : '' }}
      >
         <span className={styles.id}>
            ID: <b>{id}</b>
         </span>
         <Switch
            checked={completed}
            onChange={() => dispatch(toggleStatus(id))}
            inputProps={{ 'aria-label': 'controlled' }}
         />
         <div
            className={styles.title}
            style={{ textDecoration: completed ? 'line-through' : '' }}
         >
            {title}
         </div>
         <Link to={`/todos/${id}`} className={styles.edit}>
            <BiEditAlt />
         </Link>
         <button
            onClick={() => dispatch(deleteTodo(String(id)))}
            className={styles.delete}
         >
            <RxCross2 />
         </button>
      </li>
   );
};
