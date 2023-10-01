import React from 'react';
import { TodoList } from '../../components/todoList/component';
import styles from './style.module.scss';
import BasicModal from '../../components/modal/component';
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { setSortTodoType } from '../../redux/slices/topicSlice';

export const Todos: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [sort, setSort] = React.useState('titleAsc');
  const [value, setValue] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  React.useEffect(() => {
    dispatch(setSortTodoType(sort));
  }, [dispatch, sort]);

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target.value);
  };

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
            <MenuItem value={'titleAsc'}>TITLE &#129145;</MenuItem>
            <MenuItem value={'titleDesc'}>TITLE &#129147;</MenuItem>
            <MenuItem value={'idAsc'}>ID &#129145;</MenuItem>
            <MenuItem value={'idDesc'}>ID &#129147;</MenuItem>
            <MenuItem value={'completed'}>COMPLETED &#10003;</MenuItem>
          </Select>
        </FormControl>
        <BasicModal />
        <Input
          color="primary"
          disabled={false}
          placeholder="Filter search"
          value={value}
          onChange={onFilterChange}
        />
      </div>
      <TodoList filteredValue={value} />
    </div>
  );
};
