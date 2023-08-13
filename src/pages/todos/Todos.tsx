import React from 'react';
import { TodoList } from '../../components/todoList/component';
import styles from './style.module.scss';
import BasicModal from '../../components/modal/component';
import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { setSortType } from '../../redux/slices/topicSlice';

export const Todos: React.FC = (): JSX.Element => {
   const dispatch = useAppDispatch();
   const [sort, setSort] = React.useState('idAsc');

   const handleChange = (event: SelectChangeEvent) => {
      setSort(event.target.value);
   };

   React.useEffect(() => {
      dispatch(setSortType(sort));
   }, [dispatch, sort]);

   return (
      <div className={styles.root}>
         <div className={styles.top}>
            <FormControl sx={{ width: '200px' }}>
               <InputLabel
                  id="demo-simple-select-label"
                  sx={{ backgroundColor: 'white', padding: '0 6px' }}
               >
                  Sort to...
               </InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="Age"
                  onChange={handleChange}
               >
                  <MenuItem value={'titleAsc'}>TITLE &#129147;</MenuItem>
                  <MenuItem value={'titleDesc'}>TITLE &#129145;</MenuItem>
                  <MenuItem value={'idAsc'}>ID &#129147;</MenuItem>
                  <MenuItem value={'idDesc'}>ID &#129145;</MenuItem>
                  <MenuItem value={'completed'}>COMPLETED &#10003;</MenuItem>
               </Select>
            </FormControl>
            <BasicModal />
         </div>
         <TodoList />
      </div>
   );
};
