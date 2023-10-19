import React from 'react';
import { AlbumsList } from '../../components/albumsList/component';
import styles from './style.module.scss';
import { IoMdHeartDislike } from 'react-icons/io';
import { clearAlbumFavorites } from '../../redux/slices/favoriteAlbumSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FiSearch } from 'react-icons/fi';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const Albums = (): JSX.Element => {
  const [value, setValue] = React.useState<string>('');
  const [sort, setSort] = React.useState<string>('titleAsc');

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((item) => item.albumFavorites.list).length;

  const handlerChangeInput = (e: any) => {
    setValue(e.target.value);
  };

  const onChangeSelect = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSort(e.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.sort}>
          <FormControl sx={{ width: '200px' }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ backgroundColor: '#edffeb', padding: '0 6px' }}
            >
              Sort to...
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Age"
              onChange={onChangeSelect}
            >
              <MenuItem value={'titleAsc'}>Title &#129145;</MenuItem>
              <MenuItem value={'titleDesc'}>Title &#129147;</MenuItem>
              <MenuItem value={'idAsc'}>ID &#129145;</MenuItem>
              <MenuItem value={'idDesc'}>ID &#129147;</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={styles.filter}>
          <FiSearch />
          <input
            className={styles.input}
            value={value}
            onChange={handlerChangeInput}
            placeholder="Search..."
          />
        </div>
        {favorites > 0 && (
          <button
            className={styles.clearFavorite}
            onClick={() => dispatch(clearAlbumFavorites())}
            title="Clear favorites"
          >
            <IoMdHeartDislike />
            <span className={styles.favoritesLengthCount}>{favorites}</span>
          </button>
        )}
      </div>
      <AlbumsList value={value} sortType={sort} />
    </div>
  );
};
