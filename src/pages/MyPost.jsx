import React from 'react';
import { useLocation } from 'react-router-dom';
import MyPostcomponent from '../components/MyPostcomponent';

function MyPost() {
  const location = useLocation();
  const { BookmarkMode, deleteComplete = false } = location.state;

  return (
    <MyPostcomponent
      BookmarkMode={BookmarkMode}
      deleteComplete={deleteComplete}
    />
  );
}

export default MyPost;
