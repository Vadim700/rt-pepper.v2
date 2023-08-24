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
   const sortType = useAppSelector((type) => type.topic.sortTodoType);

   const titleAsc = (a: Todo, b: Todo) => a.title.localeCompare(b.title);
   const titleDesc = (a: Todo, b: Todo) => b.title.localeCompare(a.title);

   const idAsc = (a: Todo, b: Todo) => a.id - b.id;
   const idDesc = (a: Todo, b: Todo) => b.id - a.id;

   const completedDesc = (a: any, b: any) => a.completed - b.completed; // firstly completed

   const mySort = React.useMemo(() => {
      switch (sortType) {
         case 'idAsc':
            return [...data]
               .sort(idAsc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ));
         case 'idDesc':
            return [...data]
               .sort(idDesc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ));
         case 'titleAsc':
            return [...data]
               .sort(titleAsc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ));
         case 'titleDesc':
            return [...data]
               .sort(titleDesc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ));
         case 'completed':
            return [...data]
               .sort(completedDesc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ));
      }
   }, [data, sortType]);

   return <ul className={styles.root}>{mySort}</ul>;
};
