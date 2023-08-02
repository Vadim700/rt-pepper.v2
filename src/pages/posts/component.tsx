import React from 'react';
import { PostsList } from '../../components/postsList/component';
import BasicModal from '../../components/modal/component';

export const Posts = (): JSX.Element => {
   return (
      <div>
         <BasicModal />
         <PostsList />
      </div>
   );
};
