import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addNewTodo } from '../../redux/slices/todoSlice';
import { FC } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import styles from './style.module.scss';

type FullWidthTextFieldProps = {
   label: any;
   id: string;
   postValue: any;
   value: any;
   defaultValue: any;
};

export const FullWidthTextField: FC<FullWidthTextFieldProps> = ({
   label,
   id,
   postValue,
   // defaultValue,
}) => {
   const [value, setValue] = React.useState<string>('');
   const dispatch = useAppDispatch();
   const state = useAppSelector((state) => state.topic.topic);
   const current = useAppSelector((item) => item.todo.list).map(
      (todo) => todo.id,
   );
   const maxId = Math.max(...current) + 1;

   const handleChange = (event: {
      target: { value: React.SetStateAction<string> };
   }) => {
      setValue(event.target.value);
   };

   const handleAction = () => {
      if (value.trim().length) {
         dispatch(addNewTodo({ value, maxId }));
         setValue('');
      }
   };

   return (
      <>
         <Box
            sx={{
               maxWidth: '100%',
               margin: '0 auto 20px',
               display: 'flex',
               columnGap: '20px',
            }}
         >
            <TextField
               fullWidth
               label={label}
               id={id}
               value={value}
               onChange={handleChange}
               autoComplete="off"
               type="text"
            />
            <button type="submit" onClick={handleAction} className={styles.add}>
               <AiOutlineFileAdd />
            </button>
         </Box>
      </>
   );
};
