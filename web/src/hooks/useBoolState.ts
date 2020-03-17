import { useState, useCallback } from 'react';

export default (initialValue: boolean):
[boolean, () => void, () => void, () => void] => {
  const [value, setValue] = useState(initialValue);

  const set = useCallback(() => {
    setValue(true);
  }, []);

  const reset = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, set, reset, toggle];
};
