/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

function FileUploader() {
  const [image, setimage] = useState(null);
  const setThumbnail = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    // eslint-disable-next-line no-shadow
    reader.onload = event => {
      setimage(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    setimage(null);
  };

  return (
    <div className='w-[200px] h-[200px]'>
      {!image ? (
        <>
          <label className='signup-profileImg-label' htmlFor='profileImg'>
            <div className='absolute flex items-center justify-center border w-[200px] h-[200px] bg-[#D9D9D9] rounded-[10px]'>
              +
            </div>
          </label>
          <input
            className='signup-profileImg-label relative hidden z-50 object-fill'
            type='file'
            id='profileImg'
            accept='image/*'
            onChange={setThumbnail}
          />
        </>
      ) : (
        <div>
          {image && (
            <img
              role='none'
              className='w-[200px] h-[200px] object-cover'
              src={image}
              alt='Thumbnail'
              onClick={deleteImage}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default FileUploader;
