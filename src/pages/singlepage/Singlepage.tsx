import React from 'react';
import { useParams } from 'react-router-dom';

export const Singlepage = (): JSX.Element => {
   console.log(useParams());
   const { id } = useParams();
   console.log(id);

   return <div>SINGLEPAGE - {id}</div>;
};
