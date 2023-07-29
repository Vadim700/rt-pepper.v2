import * as React from 'react';
import styles from './style.module.scss';

import { BsPostcardHeart } from 'react-icons/bs';
import { MdOutlinePhotoAlbum } from 'react-icons/md';
import { FaListCheck } from 'react-icons/fa6';

import { NavLink } from 'react-router-dom';

export const Buttons: React.FC = () => {
   const setActive = ({ isActive }: any): any => {
      return { backgroundColor: isActive ? '#1976d2' : 'black' };
   };

   return (
      <div className={styles.root}>
         <NavLink className={styles.button} to="/" style={setActive}>
            <BsPostcardHeart className={styles.icon} />
            Posts
         </NavLink>
         <NavLink className={styles.button} to="/albums" style={setActive}>
            <MdOutlinePhotoAlbum className={styles.icon} />
            Albums
         </NavLink>
         <NavLink className={styles.button} to="/todos" style={setActive}>
            <FaListCheck className={styles.icon} />
            Todos
         </NavLink>
      </div>
   );
};
