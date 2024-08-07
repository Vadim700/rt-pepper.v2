import React from 'react';
import { PostsList } from '../../components/postsList/component';
import BasicModal from '../../components/modal/component';
import styles from './style.module.scss';
import { IoMdHeartDislike } from 'react-icons/io';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortPostType } from '../../redux/slices/topicSlice';

import { Filter } from '../../components/filter/component';
import { clearFavorites } from '../../redux/slices/favoriteSlice';
import { useWindowWidth } from '../../components/windowWidth/useWindowWidth';

export const Posts = (): JSX.Element => {
  const [sort, setSort] = React.useState<string>('idAsc');
  const [valueInput, setValueInput] = React.useState<string>('');
  const [valueSelect, setValueSelect] = React.useState<string>('');
  const dispatch = useAppDispatch();

  const favoritesLength = useAppSelector((item) => item.favorites.list).length;
  const windowWidth = useWindowWidth();

  const handlerChangeInput = (e: any) => {
    setValueInput(e.target.value);
  };
  const handlerChangeSelect = (e: any) => {
    setValueSelect(e);
  };

  React.useEffect(() => {
    dispatch(setSortPostType(sort));
  }, [dispatch, sort]);

  return (
    <>
      <div className={styles.top}>
        <div className={styles.sort}>
          <FormControl sx={{ width: windowWidth.current <= 350 ? 110 : 200 }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                backgroundColor: '#edffeb',
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
              onChange={(e: SelectChangeEvent) => setSort(e.target.value)}
            >
              <MenuItem value={'titleAsc'}>Title ↓</MenuItem>
              <MenuItem value={'titleDesc'}>Title ↑</MenuItem>
              <MenuItem value={'idAsc'}>ID ↑</MenuItem>
              <MenuItem value={'idDesc'}>ID ↓</MenuItem>
              <MenuItem value={'nameAsc'}>Name ↓</MenuItem>
              <MenuItem value={'nameDesc'}>Name ↑</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={styles.filter}>
          <Filter
            handlerChangeInput={handlerChangeInput}
            handlerChangeSelect={handlerChangeSelect}
          />
        </div>

        <div title="Add new post" className={styles.modal}>
          <BasicModal />
        </div>

        {favoritesLength > 0 && (
          <button
            className={styles.clearFavorite}
            onClick={() => dispatch(clearFavorites())}
            title="Clear favorites"
          >
            <IoMdHeartDislike />
            <span className={styles.favoritesLengthCount}>
              {favoritesLength}
            </span>
          </button>
        )}
      </div>

      <PostsList valueInput={valueInput} valueSelect={valueSelect} />
    </>
  );
};
