import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export const ControlledCheckbox = ({ onchange }: any) => {
   const [checked, setChecked] = React.useState(true);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      onchange(event.target.value);
   };

   return (
      <>
         <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
         />
      </>
   );
};
