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
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortPostType } from '../../redux/slices/topicSlice';
import { LuHeartOff } from 'react-icons/lu';
import { clearFavorites } from '../../redux/slices/favoriteSlice';

export const Posts = (): JSX.Element => {
   const [sort, setSort] = React.useState('idAsc');
   const dispatch = useAppDispatch();
   const favoritesLangth = useAppSelector((item) => item.favorites.list.length);

   const handleChange = (event: SelectChangeEvent) => {
      setSort(event.target.value);
   };

   React.useEffect(() => {
      dispatch(setSortPostType(sort));
   }, [dispatch, sort]);

   return (
      <>
         <div className={styles.top}>
            <button>fillter</button>
            <div className={styles.sort}>
               <FormControl sx={{ width: '200px' }}>
                  <InputLabel
                     id="demo-simple-select-label"
                     sx={{
                        backgroundColor: 'white',
                        padding: '0 6px',
                     }}
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
                     <MenuItem value={'idAsc'}>ID &#129145;</MenuItem>
                     <MenuItem value={'idDesc'}>ID &#129147;</MenuItem>
                     <MenuItem value={'nameAsc'}>NAME &#129147;</MenuItem>
                     <MenuItem value={'nameDesc'}>NAME &#129145;</MenuItem>
                  </Select>
               </FormControl>
            </div>

            <div title="Add new post" className={styles.modal}>
               <BasicModal />
            </div>
            <button
               className={styles.clearFavorite}
               onClick={() => dispatch(clearFavorites())}
               title="Clear favorites"
            >
               <LuHeartOff />
               {favoritesLangth > 0 && <span>{favoritesLangth}</span>}
            </button>
         </div>
         <PostsList />
      </>
   );
};
