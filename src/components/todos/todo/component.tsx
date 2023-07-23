import React, { FC } from 'react';
import styles from './style.module.scss';

type TodoProps = {
   data: any;
};

export const Todo: FC<TodoProps> = ({ data }): JSX.Element => {
   return <div>Todo</div>;
};
