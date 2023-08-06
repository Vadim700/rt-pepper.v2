import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FullWidthTextField } from '../fullWidthTextField/component';
import styles from './style.module.scss';
import { GrAddCircle } from 'react-icons/gr';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppSelector } from '../../hooks';

const style = {
   position: 'absolute' as 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 500,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
   borderRadius: '8px',
};

const styleOpenButton = {
   border: '3px solid',
   fontSize: '50px',
   padding: '10px',
};

export default function BasicModal() {
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const state = useAppSelector((state) => state.topic.topic);

   const handleSubmit = (e: any) => {
      e.preventDefault();
      handleClose();
   };

   const postValue = (e: any) => {};

   return (
      <div className={styles.root}>
         <Button onClick={handleOpen} sx={styleOpenButton}>
            <GrAddCircle />
         </Button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <form action="#" onSubmit={handleSubmit}>
                  <Typography
                     id="modal-modal-title"
                     variant="h6"
                     component="h2"
                     sx={{ marginBottom: '10px' }}
                  >
                     Add new {state.slice(0, -1)} item
                  </Typography>
                  {state === 'posts' && (
                     <>
                        <FullWidthTextField
                           label={'TITLE'}
                           id={'title'}
                           postValue={postValue}
                           defaultValue={''}
                           value={''}
                        />
                        <FullWidthTextField
                           label={'NAME'}
                           id={'name'}
                           postValue={postValue}
                           defaultValue={''}
                           value={''}
                        />
                        <FullWidthTextField
                           label={'POST'}
                           id={'post'}
                           postValue={postValue}
                           defaultValue={''}
                           value={''}
                        />
                     </>
                  )}
                  {state === 'todos' && (
                     <FullWidthTextField
                        label={'NEW TASK'}
                        id={'task'}
                        postValue={postValue}
                        defaultValue={''}
                        value={''}
                     />
                  )}
               </form>
               <span className={styles.close} onClick={handleClose}>
                  <AiOutlineClose />
               </span>
            </Box>
         </Modal>
      </div>
   );
}
