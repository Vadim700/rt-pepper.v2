import React, { FC } from 'react';
import { SiGhostery } from 'react-icons/si';
import { Buttons } from '../buttons/component';
import { BasicSelect } from '../basicSelect/component';

import styles from './style.module.scss';

type HeaderProps = {};

export const Header: FC<HeaderProps> = (): JSX.Element => {
   return (
      <header className={styles.root}>
         <div className={styles.top}>
            <a href="/" className={styles.logo}>
               <SiGhostery />
            </a>
            <span className={styles.title}>Confident pepper</span>
         </div>
         <div className={styles.bottom}>
            <Buttons />
            <BasicSelect />
         </div>
      </header>
   );
};
