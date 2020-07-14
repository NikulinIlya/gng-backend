import React from "react";

import "./button.scss";

function Button({ children, ...restProps }) {
  return (
    <button className="btn" {...restProps} >
      <span className="btn__text">{children}</span>
    </button>
  );
}

export default Button;
