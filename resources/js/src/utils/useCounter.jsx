import React, { useState, useEffect } from "react";

export default function useCounter(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const increment = (_) => setValue(value + 1);
  const decrement = (_) => setValue(value <= 1 ? 1 : value - 1);
  const dispatch = (action) => {
    const actions = {
      inc: increment,
      dec: decrement,
    };
    if (!actions[action]) throw new Error("Invalid counter action");
    actions[action]();
  };
  return { value, dispatch };
}
