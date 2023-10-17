import React, { FC } from 'react';
import { SiGhostery } from 'react-icons/si';
import { Buttons } from '../buttons/component';
import { BasicSelect } from '../basicSelect/component';

import styles from './style.module.scss';
import { useAppSelector } from '../../hooks';

type HeaderProps = {};

export const Header: FC<HeaderProps> = (): JSX.Element => {
  const topic = useAppSelector((item) => item.topic.topic);

  return (
    <header className={styles.root}>
      <div
        className={styles.top}
        style={{ marginRight: topic === 'posts' ? '50px' : '' }}
      >
        <a href="/" className={styles.logo}>
          <SiGhostery />
        </a>
        <span className={styles.title}>Confident pepper</span>
        <div className={styles.pagination} id="pagination">
          {/* a portal is inserted here */}
        </div>
      </div>

      <div
        className={styles.bottom}
        style={{ marginRight: topic === 'posts' ? '50px' : '' }}
      >
        <Buttons />
        <BasicSelect />
      </div>
    </header>
  );
};
