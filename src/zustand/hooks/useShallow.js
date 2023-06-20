import { shallow } from 'zustand/shallow';

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
