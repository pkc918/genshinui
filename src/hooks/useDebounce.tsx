import {useEffect, useState} from "react";

function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  // 防抖
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 在执行下一次之前执行
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounce;
