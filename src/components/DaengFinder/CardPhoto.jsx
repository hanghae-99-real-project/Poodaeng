import React from 'react';

const CardPhoto = ({ lostPhotoUrl, isDetail }) => {
  return (
    <img
      src={lostPhotoUrl}
      alt='photoThumb'
      className={`image transition duration-300 ease-in-out ${
        !isDetail && 'hover:scale-110 cursor-pointer'
      }`}
    />
  );
};

export default CardPhoto;
