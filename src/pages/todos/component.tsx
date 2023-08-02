import React from 'react';
import { TodoList } from '../../components/todoList/component';
import styles from './style.module.scss';
import BasicModal from '../../components/modal/component';

export const Todos: React.FC = (): JSX.Element => {
   return (
      <div className={styles.root}>
         <BasicModal />
         <TodoList />
      </div>
   );
};
