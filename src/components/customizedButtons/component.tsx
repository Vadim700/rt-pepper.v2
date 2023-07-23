import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

import { BsPostcardHeart } from 'react-icons/bs';
import { MdOutlinePhotoAlbum } from 'react-icons/md';
import { FaListCheck } from 'react-icons/fa6';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setState } from '../../redux/slices/stateSlice';

const ColorButton = styled(Button)<ButtonProps>(() => ({
   padding: '6px 30px',
   backgroundColor: 'black',
   fontSize: '20px',
   fontFamily: 'Creepster, cursive',
   letterSpacing: '2px',
   outline: 'none',
}));

export const CustomizedButtons: React.FC = () => {
   const state = useAppSelector((a: any) => a.topic.topic);
   const dispatch = useAppDispatch();

   return (
      <Stack spacing={2} direction="row">
         <ColorButton
            id="posts"
            onClick={() => dispatch(setState('posts'))}
            variant="contained"
            style={state === 'posts' ? { backgroundColor: purple[700] } : {}}
         >
            <BsPostcardHeart
               style={{ marginRight: '10px', fontSize: '24px' }}
            />
            Posts
         </ColorButton>
         <ColorButton
            id="albums"
            onClick={() => dispatch(setState('albums'))}
            variant="contained"
            style={state === 'albums' ? { backgroundColor: purple[700] } : {}}
         >
            <MdOutlinePhotoAlbum
               style={{ marginRight: '10px', fontSize: '24px' }}
            />
            Albums
         </ColorButton>
         <ColorButton
            id="todos"
            onClick={() => dispatch(setState('todos'))}
            variant="contained"
            style={state === 'todos' ? { backgroundColor: purple[700] } : {}}
         >
            <FaListCheck style={{ marginRight: '10px', fontSize: '24px' }} />
            Todos
         </ColorButton>
      </Stack>
   );
};
