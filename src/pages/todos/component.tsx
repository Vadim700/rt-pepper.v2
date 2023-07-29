import React from 'react';
import { TodoList } from '../../components/todoList/component';
import FullWidthTextField from '../../components/fullWidthTextField/component';

import styles from './style.module.scss';

export const Todos: React.FC = (): JSX.Element => {
   return (
      <div className={styles.root}>
         <FullWidthTextField />
         <TodoList />
      </div>
   );
};
