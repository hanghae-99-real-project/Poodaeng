import { shallow } from 'zustand/shallow';

/**
 * 
 * @param {Object} store 
 * @param {Array} keys 
 * @returns 
 */

const useShallow = (store, keys) => {
  return store((state) => {
    const result = {};
    keys.forEach(key => {
      result[key] = state[key];
    });
    return result;
  }, shallow);
};

export default useShallow;
