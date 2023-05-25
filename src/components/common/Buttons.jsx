import React from 'react';

function Buttons({ children, type, bgColor, textColor, onClick }) {
  return (
    // <button
    //   className='large-button bg-[#449AFF] text-[#fff]'
    //   type={type === 'button' ? 'button' : 'submit'}
    // >
    //   {children}
    // </button>
    <button
      className={`large-button ${bgColor && `bg-[${bgColor}]`} ${
        textColor && `text-[${textColor}]`
      }`}
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Buttons;
