import React, { useState, useEffect } from "react";

import "./checkbox.scss";

export default function Checkbox({
    variant = "rounded",
    defaultChecked,
    checked,
    label = "",
    className = "",
    ...inputProps
}) {
    return (
        <label className="checkbox">
            <input
                type="checkbox"
                className={`checkbox__input ${className}`}
                checked={checked}
                defaultChecked={defaultChecked}
                {...inputProps}
            />
            <div className={["checkbox__custom-view", variant].join(" ")}></div>
            {label && <span className="checkbox__label">{label}</span>}
        </label>
    );
}
