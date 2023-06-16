import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import Uptop from '../components/DaengFinder/Uptop';

/**
 * 
 * @param {String} targetElementId  element id that can be storage name
 * @param {Boolean} isScroll  true or false
 * @param {StringArray} dependOn  useEffect dependency array
 * 
 */



const useScroll = (targetElementId, isScroll, ...dependOn) => {
  const [checkScrollTop, setCheckScrollTop] = useState(0)
  /**
   * @이거 Ref 로 넘겨보자
   */
  /**
   * @checkpoint 클로저?
   */
  const scroller = document.querySelector(`#${targetElementId}`);
  useEffect(()=>{
    if(!isScroll){
      // sessionStorage.setItem(targetElementId, 0)
      sessionStorage.removeItem(targetElementId)
    }
    const currentScrollY = Number(
      JSON.parse(sessionStorage.getItem(targetElementId)),
    );
    if(currentScrollY) scroller?.scrollTo(0, currentScrollY);
    
    const saveScrollTop = debounce(() => {
      const scrollYRecord = JSON.stringify(scroller?.scrollTop);
      setCheckScrollTop(Number(scroller?.scrollTop))
      sessionStorage.setItem(targetElementId, scrollYRecord);
    }, 200);
    
    scroller?.addEventListener('scroll', saveScrollTop)
    
    return () => {
      scroller?.removeEventListener('scroll', saveScrollTop);
    };
  }, dependOn);

  /**
   * 
   * @param {Boolean} useOrNot 
   * @returns 
   */
  const ScrollTopComponent = ({useOrNot}) => <Uptop useOrNot={useOrNot} checkScrollTop={checkScrollTop} scroller={scroller}/>;

  return [ScrollTopComponent]
}

export default useScroll