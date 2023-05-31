import React from 'react';

function LinkFooter() {
  return (
    <div className='relative bottom-0 z-50 w-full h-24 pt-3 px-5 border-t border-solid shadow-md'>
      <div className='f-fr justify-between flex-wrap'>
        <div className='f-fr gap-3 w-fit flex-wrap h-5 bg-mainColor'>
          <div>icon1</div>
          <div>icon2</div>
        </div>
        <div>bookmark icon</div>
      </div>
    </div>
  );
}

export default LinkFooter;
