import * as React from 'react';
import styles from './style.module.scss';

import { BsPostcardHeart } from 'react-icons/bs';
import { MdOutlinePhotoAlbum } from 'react-icons/md';
import { FaListCheck } from 'react-icons/fa6';

import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setState } from '../../redux/slices/topicSlice';

export const Buttons: React.FC = () => {
   const dispatch = useAppDispatch();

   const setActive = ({ isActive }: any): any => {
      return { backgroundColor: isActive ? '#1976d2' : 'black' };
   };

   const handleClick = (event: any): void => {
      dispatch(setState(event.target.id));
   };

   return (
      <div className={styles.root}>
         <NavLink
            className={styles.button}
            to="/"
            style={setActive}
            id="posts"
            onClick={handleClick}
         >
            <BsPostcardHeart className={styles.icon} />
            Posts
         </NavLink>
         <NavLink
            className={styles.button}
            to="/albums"
            style={setActive}
            onClick={handleClick}
            id="albums"
         >
            <MdOutlinePhotoAlbum className={styles.icon} />
            Albums
         </NavLink>
         <NavLink
            className={styles.button}
            to="/todos"
            style={setActive}
            onClick={handleClick}
            id="todos"
         >
            <FaListCheck className={styles.icon} />
            Todos
         </NavLink>
      </div>
   );
};
