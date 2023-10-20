import React, { FC } from 'react';
import styles from './style.module.scss';

import { useAppDispatch } from '../../hooks';
import { Link } from 'react-router-dom';

import { RxCross2 } from 'react-icons/rx';
import { Switch } from '@mui/material';
import { BiEditAlt } from 'react-icons/bi';
import { deleteTodo, toggleStatus } from '../../redux/thunks/todoThunks';
import { useWindowWidth } from '../windowWidth/useWindowWidth';

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
  const windowWidth = useWindowWidth();

  return (
    <li
      className={styles.root}
      style={{ borderColor: completed ? 'var(--blue)' : '' }}
    >
      <span className={styles.id}>
        <b>{id}</b>
      </span>
      <span className={styles.toggler}>
        <Switch
          checked={completed}
          onChange={() => dispatch(toggleStatus(id))}
          inputProps={{ 'aria-label': 'controlled' }}
          size={windowWidth.current <= 478 ? 'small' : 'medium'}
        />
      </span>
      <div
        className={styles.title}
        style={{ textDecoration: completed ? 'line-through' : '' }}
      >
        {title}
      </div>
      <div className={styles.action}>
        <Link to={`/todos/${id}`} className={styles.edit}>
          <BiEditAlt />
        </Link>
        <button
          onClick={() => dispatch(deleteTodo(String(id)))}
          className={styles.delete}
        >
          <RxCross2 />
        </button>
      </div>
    </li>
  );
};
