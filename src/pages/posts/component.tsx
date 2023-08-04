import React from 'react';
import { PostsList } from '../../components/postsList/component';
import BasicModal from '../../components/modal/component';
import styles from './style.module.scss';

export const Posts = (): JSX.Element => {
   return (
      <div>
         <div className={styles.top}>
            <button>fillter</button>
            <button>sort</button>
            <BasicModal />
         </div>
         <PostsList />
      </div>
   );
};
