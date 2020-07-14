import React from "react";

import "./range.scss";

function Range({ className = "", ...props }) {
  return (
    <input
      type="range"
      className={["input-range", className].join(" ")}
      {...props}
    />
  );
}

export default Range;
