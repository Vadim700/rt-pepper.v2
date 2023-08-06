import React from 'react';
import { TodoList } from '../../components/todoList/component';
import styles from './style.module.scss';
import BasicModal from '../../components/modal/component';
import { Link } from 'react-router-dom';

export const Todos: React.FC = (): JSX.Element => {
   return (
      <div className={styles.root}>
         <div className={styles.top}>
            <button>sort</button>
            <BasicModal />
         </div>
         <TodoList />
      </div>
   );
};
