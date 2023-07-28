import React, { FC } from 'react';
import styles from './style.module.scss';

type AlbumProps = {
   data: any;
};

export const Album: FC<AlbumProps> = ({ data }): JSX.Element => {
   return <div>Album</div>;
};
