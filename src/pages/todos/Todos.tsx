import React from 'react';
import { TodoList } from '../../components/todoList/component';
import styles from './style.module.scss';
import BasicModal from '../../components/modal/component';

export const Todos: React.FC = (): JSX.Element => {
   const handleClick = () => {};

   return (
      <div className={styles.root}>
         <div className={styles.top}>
            <button onClick={handleClick}>sort</button>
            <BasicModal />
         </div>
         <TodoList />
      </div>
   );
};
