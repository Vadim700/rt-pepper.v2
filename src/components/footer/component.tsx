import React, { FC } from 'react';
import styles from './styles.module.scss';
type FooterProps = {};

export const Footer: FC<FooterProps> = (): JSX.Element => {
   return (
      <footer className={styles.root}>
         <div className={styles.title}>Footer title</div>
      </footer>
   );
};
