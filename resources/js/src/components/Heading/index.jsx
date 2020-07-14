import React, { useState, useEffect, createElement } from "react";

import "./heading.scss";

export default function Heading({ as = "h2", children, className = '', ...restProps }) {
  return createElement(as, {
    children: createElement("span", { children, className: "text-content" }),
    className: ['heading',className].join(' '),
    ...restProps,
  });
}
