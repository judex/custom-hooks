import { useState } from "react";

export const useCounter = (initialValue = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const incrementar = (value = 1) => {
    setCounter((counter) => counter + value);
  };
  const decrementar = (value = 1) => {
    if (counter === 0) return;
    setCounter((counter) => counter - value);
  };

  const reset = () => {
    setCounter(initialValue);
  };

  return {
    counter,
    incrementar,
    decrementar,
    reset,
  };
};
