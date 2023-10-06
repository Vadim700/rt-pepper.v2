import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useAppDispatch } from '../../hooks';
import { setStateLimit } from '../../redux/slices/topicSlice';

export const BasicSelect = () => {
  const [count, setCount] = React.useState('');
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setCount(event.target.value as string);
    dispatch(setStateLimit(Number(event.target.value)));
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            padding: '0 10px',
            backgroundColor: '#ffce2b',
            fontFamily: 'Creepster, cursive',
            letterSpacing: '2px',
            borderColor: 'blue',
          }}
        >
          Items per page
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={count}
          label="Age"
          onChange={handleChange}
          sx={{
            '& .MuiSelect-select': {
              padding: '12.5px 14px',
            },
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={0}>All</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
