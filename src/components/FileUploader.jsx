/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

function FileUploader() {
  const [thumbnailSrc, setThumbnailSrc] = useState(null);

  const setThumbnail = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    // eslint-disable-next-line no-shadow
    reader.onload = event => {
      setThumbnailSrc(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className='signup-profileImg-label' htmlFor='profileImg'>
        <div className='absolute flex items-center justify-center border w-[200px] h-[200px] bg-[#D9D9D9] rounded-[10px]'>
          +
        </div>
      </label>
      <input
        className='signup-profileImg-label relative hidden z-50'
        type='file'
        id='profileImg'
        accept='image/*'
        onChange={setThumbnail}
      />
      <div id='image_container'>
        {thumbnailSrc && <img src={thumbnailSrc} alt='Thumbnail' />}
      </div>
    </div>
  );
}

export default FileUploader;
