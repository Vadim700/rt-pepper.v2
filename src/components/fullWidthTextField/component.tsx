import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from '../../hooks';
import { addNewTodo } from '../../redux/slices/todoSlice';

export default function FullWidthTextField() {
   const [value, setVaue] = React.useState<string>('');
   const dispatch = useAppDispatch();

   const handleChange = (event: {
      target: { value: React.SetStateAction<string> };
   }) => {
      setVaue(event.target.value);
   };

   const handleAction = () => {
      if (value.trim().length) {
         dispatch(addNewTodo(value));
         setVaue('');
      }
   };

   return (
      <>
         <Box
            sx={{
               width: 500,
               maxWidth: '100%',
               margin: '0 auto 20px',
            }}
         >
            <TextField
               fullWidth
               label="add task"
               id="fullWidth"
               value={value}
               onChange={handleChange}
            />
            <button type="submit" onClick={handleAction}>
               Add task
            </button>
         </Box>
      </>
   );
}
