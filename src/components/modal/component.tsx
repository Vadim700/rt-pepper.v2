import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { FullWidthTextField } from '../fullWidthTextField/component';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { GrAddCircle } from 'react-icons/gr';
import { RiCloseCircleLine } from 'react-icons/ri';
import { FaAngellist } from 'react-icons/fa';

import styles from './style.module.scss';
import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
} from '@mui/material';
import { addNewPost } from '../../redux/slices/postsSlice';

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
   fontSize: '38px',
   padding: '10px',
};

export default function BasicModal() {
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const dispatch = useAppDispatch();

   const state = useAppSelector((state) => state.topic.topic);
   const users = useAppSelector((name) => name.user.list);
   const maxId = useAppSelector((post) => post.post.list).map(
      (item) => item.id,
   );

   const id = Math.max(...maxId) + 1;

   const [title, setTitle] = React.useState('');
   const [body, setBody] = React.useState('');
   const [name, setName] = React.useState('');

   const handleSubmit = (e: any) => {
      e.preventDefault();
      handleClose();

      dispatch(addNewPost({ title, body, id, name }));
      setTitle('');
      setBody('');
   };

   const handleChange = (event: SelectChangeEvent) => {
      setName(event.target.value as string);
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
                     sx={{
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                     }}
                  >
                     Add new {state.slice(0, -1)} item
                  </Typography>
                  {state === 'posts' && (
                     <div className={styles.postForm}>
                        <input
                           className={styles.input}
                           placeholder="title"
                           id="title"
                           autoComplete="off"
                           value={title}
                           onChange={(e: any) => setTitle(e.target.value)}
                        />
                        <input
                           className={styles.input}
                           placeholder="body"
                           id="body"
                           autoComplete="off"
                           value={body}
                           onChange={(e: any) => setBody(e.target.value)}
                        />
                        <FormControl fullWidth>
                           <InputLabel
                              id="demo-simple-select-label"
                              sx={{
                                 textTransform: 'uppercase',
                                 backgroundColor: 'white',
                                 padding: '0 6px',
                              }}
                           >
                              Name
                           </InputLabel>
                           <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={name}
                              label="Age"
                              onChange={handleChange}
                           >
                              {users.map((name: any, key) => (
                                 <MenuItem value={name} key={key}>
                                    {name}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>

                        <button className={styles.submit} type="submit">
                           <FaAngellist />
                        </button>
                     </div>
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
                  <RiCloseCircleLine />
               </span>
            </Box>
         </Modal>
      </div>
   );
}
