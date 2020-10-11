import React, { useState, useEffect, createElement } from "react";

import "./text-field.scss";

export default function TextField({
    multiline = false,
    label = "",
    ...restProps
}) {
    return (
        <label className="field">
            {label && <span className="field__label">{label}</span>}
            <div className="field__input">
                {multiline ? (
                    <Textarea {...restProps} />
                ) : (
                    <Input {...restProps} />
                )}
            </div>
        </label>
    );
}

function Input({ placeholder, type = "text", ...restProps }) {
    return <input type={type} placeholder={placeholder} {...restProps} />;
}

function Textarea({ placeholder, ...restProps }) {
    return (
        <textarea
            cols="30"
            rows="10"
            placeholder={placeholder}
            {...restProps}
        ></textarea>
    );
}
