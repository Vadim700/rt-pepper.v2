import React, { FC } from 'react';
import styles from './style.module.scss';

type AlbumItemProps = {
   data: any;
};

export const AlbumItem: FC<AlbumItemProps> = ({ data }): JSX.Element => {
   return <div>Album</div>;
};
