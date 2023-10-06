import React from 'react';
import styles from './style.module.scss';
import { useParams } from 'react-router-dom';

export const EditAlbumTitle = () => {
  const { id } = useParams();

  return <div>EditAlbumTitle - {id}</div>;
};
