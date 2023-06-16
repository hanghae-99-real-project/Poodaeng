import { debounce } from 'lodash';
import { useEffect } from 'react';

/**
 * 
 * @param {String} targetElementId  element id that can be storage name
 * @param {Boolean} isScroll  true or false
 * @param {StringArray} dependOn  useEffect dependency array
 * 
 */
const useScroll = (targetElementId, isScroll, ...dependOn) => {
  useEffect(()=>{
    if(!isScroll){
      // sessionStorage.setItem(targetElementId, 0)
      sessionStorage.removeItem(targetElementId)
    }
    const scroller = document.querySelector(`#${targetElementId}`);
    const currentScrollY = Number(
      JSON.parse(sessionStorage.getItem(targetElementId)),
    );
    if(currentScrollY) scroller?.scrollTo(0, currentScrollY);
    
    const saveScrollTop = debounce(() => {
      const scrollYRecord = JSON.stringify(scroller?.scrollTop);
      sessionStorage.setItem(targetElementId, scrollYRecord);
    }, 200);
    
    scroller?.addEventListener('scroll', saveScrollTop)
    
    return () => {
      scroller?.removeEventListener('scroll', saveScrollTop);
    };
  }, dependOn);

  return (
    
  )
}

export default useScroll