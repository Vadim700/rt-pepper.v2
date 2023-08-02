import React, { FC } from 'react';
import styles from './style.module.scss';

import { useAppDispatch } from '../../hooks';

import { deleteTodo, toggleStatus } from '../../redux/slices/todoSlice';
import { RxCross2 } from 'react-icons/rx';
import { Switch } from '@mui/material';

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

   const [checked, setChecked] = React.useState(true);

   const handleChange = (event: any) => {
      setChecked(event.target.checked);
      dispatch(toggleStatus(id));
   };

   return (
      <li
         className={styles.root}
         style={{ borderColor: completed ? 'green' : '' }}
      >
         <span className={styles.id}>
            ID: <b>{id}</b>
         </span>
         <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
         />
         <div
            className={styles.title}
            style={{ textDecoration: completed ? 'line-through' : '' }}
         >
            {title}
         </div>
         <button
            onClick={() => dispatch(deleteTodo(String(id)))}
            className={styles.delete}
         >
            <RxCross2 />
         </button>
      </li>
   );
};
