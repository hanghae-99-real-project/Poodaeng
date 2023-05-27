/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

function FileUploader({ onFileUpload }) {
  const [image, setImage] = useState(null);
  const setThumbnail = event => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      onFileUpload(file);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  return (
    <div className='w-[150px] h-[150px]'>
      {!image ? (
        <>
          <label className='fileImg-label' htmlFor='fileImg'>
            <div className='absolute flex items-center justify-center border w-[150px] h-[150px] bg-[#D9D9D9] rounded-[10px]'>
              +
            </div>
          </label>
          <input
            className='fileImg-label relative hidden z-50 object-fill'
            type='file'
            id='fileImg'
            accept='image/*'
            onChange={setThumbnail}
          />
        </>
      ) : (
        <div>
          {image && (
            <img
              role='none'
              className='w-[150px] h-[150px] object-cover'
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
