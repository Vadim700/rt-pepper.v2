import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const BasicSelect = () => {
   const [age, setAge] = React.useState('');

   const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
   };

   return (
      <Box sx={{ minWidth: 200 }}>
         <FormControl fullWidth>
            <InputLabel
               id="demo-simple-select-label"
               sx={{
                  padding: '0 10px',
                  backgroundColor: 'white',
                  fontFamily: 'Creepster, cursive',
                  letterSpacing: '2px',
               }}
            >
               Items on page
            </InputLabel>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={age}
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
               <MenuItem value={30}>30</MenuItem>
               <MenuItem value={50}>50</MenuItem>
               <MenuItem value={100}>100</MenuItem>
            </Select>
         </FormControl>
      </Box>
   );
};
