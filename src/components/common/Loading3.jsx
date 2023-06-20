import React, { useEffect, useState } from 'react';

function Loading() {
  const [loadingText, setLoadingText] = useState('◼');
  let intervalTime = null;
  useEffect(() => {
    intervalTime = setInterval(
      () => setLoadingText(prev => (prev === '◼◼◼◼◼' ? '◼' : `${prev}◼`)),
      150,
    );

    return () => {
      clearInterval(intervalTime);
    };
  });
  return (
    <span className='mobile:hidden text-white text-3xl font-extrabold'>
      Loading{loadingText}
    </span>
  );
}

export default Loading;
