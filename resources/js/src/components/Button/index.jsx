import React from "react";
import cn from "classnames";

import "./button.scss";

function Button({ children, variant = "default", ...restProps }) {
    return (
        <button className={cn("btn", `btn--${variant}`)} {...restProps}>
            <span className="btn__text">{children}</span>
        </button>
    );
}

export default Button;
