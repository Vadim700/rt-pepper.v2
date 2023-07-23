import React, { FC } from 'react';
import styles from './style.module.scss';
import { Album } from './album/component';

type AlbumsProps = {};

const arr = Array(5)
   .fill(1)
   .map((_, i) => i);

export const Albums: FC<AlbumsProps> = (): JSX.Element => {
   return (
      <div>
         {arr.map((_, i) => (
            <Album data={arr} key={i} />
         ))}
      </div>
   );
};
