/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { ReactComponent as 사진기 } from '../assets/images/사진기.svg';

function ProfileUploader({ onFileUpload }) {
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
    <div className='w-[102px] h-[102px]'>
      {!image ? (
        <>
          <label className='fileImg-label' htmlFor='fileImg'>
            <사진기 />
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
              className='w-[102px] h-[102px] object-cover rounded-full'
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

export default ProfileUploader;
