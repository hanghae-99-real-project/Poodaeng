import React from 'react';

function Maincomponent() {
  const something = false;
  return (
    <div className={`${something ? 'w-full' : 'w-1/2'}`}>Maincomponent</div>
  );
}

export default Maincomponent;
