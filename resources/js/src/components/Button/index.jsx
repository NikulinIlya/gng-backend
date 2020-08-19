import React, { createElement } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import "./button.scss";

function Button({ children, variant = "default", to = "", ...restProps }) {
    return createElement(to ? Link : "button", {
        className: cn("btn", `btn--${variant}`),
        to: to || undefined,
        children: createElement("span", { className: "btn__text", children }),
        ...restProps
    });
}

export default Button;
