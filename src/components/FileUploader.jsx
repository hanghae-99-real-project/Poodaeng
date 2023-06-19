/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { ReactComponent as 사진기 } from '../assets/images/사진기.svg';

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
    <div className='w-32 h-32'>
      {!image ? (
        <>
          <label className='fileImg-label' htmlFor='fileImg'>
            <div className='absolute flex items-center justify-center border w-32 h-32 bg-[#A5A5A5] rounded-xl font-sans font-bold text-xl'>
              <사진기 />
            </div>
          </label>
          <input
            className='fileImg-label relative hidden z-10 object-fill'
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
              className='w-32 h-32 object-cover rounded-full'
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
