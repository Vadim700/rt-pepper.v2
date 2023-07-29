import React, { FC } from 'react';

import { BiEditAlt } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

import { ControlledCheckbox } from '../checkbox/component';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import styles from './style.module.scss';

type PostItemProps = {
   title?: string;
   id?: number;
   userId?: number;
   body?: string;
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const PostItem: FC<PostItemProps> = ({
   title,
   id,
   userId,
   body,
}): JSX.Element => {
   const [checked, setChecked] = React.useState<boolean>(true);

   const onchange = () => {
      setChecked((i) => !i);
   };

   return (
      <article
         className={styles.root}
         style={{ borderColor: checked ? '#1976d2' : '' }}
      >
         <h3 className={styles.title}>{title}</h3>
         <div className={styles.text}>{body}</div>
         <div className={styles.name}>Autor</div>
         <span className={styles.checkbox}>
            <ControlledCheckbox onchange={onchange} />
         </span>
         <div className={styles.action}>
            <BiEditAlt className={styles.edit} />
            <Checkbox
               {...label}
               icon={<FavoriteBorder />}
               checkedIcon={<Favorite />}
               className={styles.favorite}
            />
            <RxCross2 className={styles.delete} />
         </div>
      </article>
   );
};
