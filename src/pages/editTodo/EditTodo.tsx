import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import styles from './style.module.scss';
import { editTodo } from '../../redux/slices/todoSlice';
type CreateTodoProps = {};

export const EditTodo: React.FC<CreateTodoProps> = (): JSX.Element => {
   const { id } = useParams();
   const dispantch = useAppDispatch();
   const navigate = useNavigate();

   const todoItem = useAppSelector((item) => item.todo.list).find(
      (i) => String(i.id) === id,
   );

   const submitHandler = (e: any) => {
      e.preventDefault();
      const value = e.target.elements[0].value;
      dispantch(editTodo({ id, value }));
      navigate(-1);
   };

   return (
      <div className={styles.root}>
         <h1 className={styles.title}>Edit Todo № {id}</h1>

         <form action="#" onSubmit={submitHandler}>
            <label htmlFor="" className={styles.label}>
               <input
                  type="text"
                  defaultValue={todoItem?.title}
                  className={styles.input}
               />
            </label>
         </form>
      </div>
   );
};
