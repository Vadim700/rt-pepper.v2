import React, { FC } from 'react';
import styles from './style.module.scss';
import { AlbumItem } from '../albumItem/component';

type AlbumsListProps = {};

const arr = Array(5)
   .fill(1)
   .map((_, i) => i);

export const AlbumsList: FC<AlbumsListProps> = (): JSX.Element => {
   return (
      <div>
         {arr.map((_, i) => (
            <AlbumItem data={arr} key={i} />
         ))}
      </div>
   );
};
