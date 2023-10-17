import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { FC } from 'react';

import styles from './style.module.scss';
import { addNewTodo } from '../../redux/thunks/todoThunks';
import { FaAngellist } from 'react-icons/fa6';

type FullWidthTextFieldProps = {
  label: any;
  id: string;
  value: any;
  defaultValue: any;
};

export const FullWidthTextField: FC<FullWidthTextFieldProps> = ({
  label,
  id,
}) => {
  const [value, setValue] = React.useState<string>('');
  const dispatch = useAppDispatch();

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
        <button
          type="submit"
          onClick={handleAction}
          className={styles.addNewTodo}
          title="submit"
        >
          <FaAngellist />
          <span>submit</span>
        </button>
      </Box>
    </>
  );
};
