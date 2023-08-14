import React from 'react';
import { PostsList } from '../../components/postsList/component';
import BasicModal from '../../components/modal/component';
import styles from './style.module.scss';
import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { setSortType } from '../../redux/slices/topicSlice';

export const Posts = (): JSX.Element => {
   const [sort, setSort] = React.useState('idAsc');
   const dispatch = useAppDispatch();

   const handleChange = (event: SelectChangeEvent) => {
      setSort(event.target.value);
   };

   React.useEffect(() => {
      dispatch(setSortType(sort));
   }, [dispatch, sort]);

   return (
      <>
         <div className={styles.top}>
            <button>fillter</button>
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
                  <MenuItem value={'nameAsc'}>NAME &#129147;</MenuItem>
                  <MenuItem value={'nameDesc'}>NAME &#129145;</MenuItem>
               </Select>
            </FormControl>

            <BasicModal />
         </div>
         <PostsList />
      </>
   );
};
