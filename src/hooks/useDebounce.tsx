import { useEffect, useState } from "react";

const DEFAULT_DELAY = 500;

/**
 *
 * @param value The value to debounce
 * @param delay Default: 500ms
 */
const useDebounce = <T,>(value: T, delay = DEFAULT_DELAY): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
