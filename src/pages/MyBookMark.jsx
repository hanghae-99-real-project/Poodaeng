import React from 'react';
import { useLocation } from 'react-router-dom'

import MyBookmarkcomponent from '../components/MyPostcomponent';

function MyBookMark() {
  const location = useLocation()
  const {BookmarkMode} = location.state
  

  return <MyBookmarkcomponent BookmarkMode={BookmarkMode} />;
}

export default MyBookMark;
