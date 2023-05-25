import React from 'react';

function Buttons({ children, type }) {
  return (
    <button
      className='large-button bg-[#449AFF] text-[#fff]'
      type={type === 'button' ? 'button' : 'submit'}
    >
      {children}
    </button>
  );
}

export default Buttons;
