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

type TodoListProps = {
   filteredValue: string;
};

export const TodoList: React.FC<TodoListProps> = ({
   filteredValue,
}): JSX.Element => {
   const data = useAppSelector((state) => state.todo.list);
   const sortType = useAppSelector((type) => type.topic.sortTodoType);

   const titleAsc = (a: Todo, b: Todo) => a.title.localeCompare(b.title);
   const titleDesc = (a: Todo, b: Todo) => b.title.localeCompare(a.title);

   const idAsc = (a: Todo, b: Todo) => a.id - b.id;
   const idDesc = (a: Todo, b: Todo) => b.id - a.id;

   const completedDesc = (a: any, b: any) => a.completed - b.completed;

   const mySort = React.useMemo(() => {
      switch (sortType) {
         case 'idAsc':
            return [...data]
               .filter((item: any) =>
                  item.title
                     .toLowerCase()
                     .includes(filteredValue.toLowerCase()),
               )
               .sort(idAsc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ));
         case 'idDesc':
            return [...data]
               .filter((item: any) =>
                  item.title
                     .toLowerCase()
                     .includes(filteredValue.toLowerCase()),
               )
               .sort(idDesc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ));
         case 'titleAsc':
            return [...data]
               .filter((item: any) =>
                  item.title
                     .toLowerCase()
                     .includes(filteredValue.toLowerCase()),
               )
               .sort(titleAsc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ));
         case 'titleDesc':
            return [...data]
               .filter((item: any) =>
                  item.title
                     .toLowerCase()
                     .includes(filteredValue.toLowerCase()),
               )
               .sort(titleDesc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ));
         case 'completed':
            return [...data]
               .filter((item: any) =>
                  item.title
                     .toLowerCase()
                     .includes(filteredValue.toLowerCase()),
               )
               .sort(completedDesc)
               .map((item: Todo, key: number) => (
                  <TodoItem key={key} {...item} />
               ));
      }
   }, [data, filteredValue, sortType]);

   return <ul className={styles.root}>{mySort}</ul>;
};
