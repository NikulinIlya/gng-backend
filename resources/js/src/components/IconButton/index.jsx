import React, { useState, useEffect } from "react";

import "./icon-button.scss";

function IconButton({ children, className = "", ...restProps }) {
  return (
    <button className={["icon-button", className].join(" ")} {...restProps}>
      {children}
    </button>
  );
}

export default IconButton;
