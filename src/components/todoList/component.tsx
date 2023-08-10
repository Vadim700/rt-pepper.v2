import React from 'react';
import styles from './style.module.scss';
import { TodoItem } from '../todoItem/component';

import { useAppSelector } from '../../hooks';

type Todo = {
   id: number;
   userId: number;
   title: string;
   completed: boolean;
};

export const TodoList: React.FC = (): JSX.Element => {
   const data = useAppSelector((state) => state.todo.list);
   const sortType = useAppSelector((type) => type.topic.sortType);

   const titleAsc = (a: any, b: any) => a.title.localeCompare(b.title);
   const titleDesc = (a: any, b: any) => b.title.localeCompare(a.title);

   const idAsc = (a: any, b: any) => a.id - b.id;
   const idDesc = (a: any, b: any) => b.id - a.id;

   const completedDesc = (a: any, b: any) => b.completed - a.completed; // first completed

   return (
      <ul className={styles.root}>
         {sortType === 'titleAsc' &&
            [...data]
               .sort(titleAsc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ))}
         {sortType === 'titleDesc' &&
            [...data]
               .sort(titleDesc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ))}
         {sortType === 'idAsc' &&
            [...data]
               .sort(idAsc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ))}
         {sortType === 'idDesc' &&
            [...data]
               .sort(idDesc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ))}
         {sortType === 'completed' &&
            [...data]
               .sort(completedDesc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ))}
      </ul>
   );
};
