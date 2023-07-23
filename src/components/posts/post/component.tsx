import React, { FC } from 'react';
import styles from './style.module.scss';

type PostProps = {
   data: any;
};

export const Post: FC<PostProps> = ({ data }): JSX.Element => {
   return <div>Post</div>;
};
