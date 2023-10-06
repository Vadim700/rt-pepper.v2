import React from 'react';
import { useParams } from 'react-router-dom';

export const AlbumPhotos = () => {
  const { id } = useParams();

  return <div>AlbumPhotos - {id}</div>;
};
