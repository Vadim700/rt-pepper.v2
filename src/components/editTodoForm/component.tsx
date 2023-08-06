import React from 'react';
import { Form } from 'react-router-dom';

type EditFormProps = {};

export const EditTodoForm: React.FC<EditFormProps> = ({
   id,
   title,
   completed,
   postId,
}: any): JSX.Element => {
   return (
      <Form action={`todos/${id}`} method="post">
         <label>
            Title:
            <input type="text" name="title" defaultValue={title} />
         </label>
         <input type="hidden" name="userId" value="1" />
         <input type="submit" value="Add todo" />
      </Form>
   );
};
