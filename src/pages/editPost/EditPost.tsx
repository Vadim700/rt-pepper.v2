import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './style.module.scss';
import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
} from '@mui/material';
import { FaAngellist } from 'react-icons/fa6';
import { editPost } from '../../redux/slices/postsSlice';

type EditPostProps = {};

export const EditPost: React.FC<EditPostProps> = (): JSX.Element => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const users = useAppSelector((name) => name.user.list);
   const post = useAppSelector((item) => item.post.list).find(
      (i) => String(i.id) === id,
   );

   const [name, setName] = React.useState('');

   const handleChange = (event: SelectChangeEvent) => {
      setName(event.target.value as string);
   };

   const submitHandler = (e: any) => {
      e.preventDefault();
      const title = e.target[0].value;
      const body = e.target[1].value;

      dispatch(editPost({ title, body, id, name }));
      navigate(-1);
   };

   return (
      <div className={styles.root}>
         <h1 className={styles.title}>Edit Post № {id}</h1>
         <form action="#" onSubmit={submitHandler}>
            <div className={styles.postForm}>
               <input
                  className={styles.input}
                  placeholder="title"
                  id="title"
                  autoComplete="off"
                  defaultValue={post?.title}
               />
               <textarea
                  className={styles.textarea}
                  placeholder="body"
                  id="body"
                  autoComplete="off"
                  defaultValue={post?.body}
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
         </form>
      </div>
   );
};
