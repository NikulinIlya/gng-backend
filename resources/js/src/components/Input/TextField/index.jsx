import React, { useState } from "react";
import InputMask from "react-input-mask";

import IconBtn from "@/components/IconButton";

import eye from "@/assets/images/icons/eye.svg";
import eyeHide from "@/assets/images/icons/hide-eye.svg";

import "./text-field.scss";

export default function TextField({
    multiline = false,
    label = "",
    ...restProps
}) {
    const [isPassVisible, setIsPassVisible] = useState(false);

    const toggleContentVisibility = e => {
        const { parentNode } = e.currentTarget;
        const input = parentNode.querySelector("input");
        const { type } = input;

        setIsPassVisible(type === "password");
        input.setAttribute("type", type === "password" ? "text" : "password");
    };

    return (
        <label className="field">
            {label && <span className="field__label">{label}</span>}
            <div className="field__input">
                {multiline ? (
                    <Textarea {...restProps} />
                ) : (
                    <Input {...restProps} />
                )}
                {restProps.type === "password" && (
                    <IconBtn
                        disabled={restProps.disabled}
                        onClick={toggleContentVisibility}
                        type="button"
                        className="field__show-hide"
                    >
                        <img src={isPassVisible ? eyeHide : eye} alt="" />
                    </IconBtn>
                )}
            </div>
        </label>
    );
}

function Input({ placeholder, type = "text", ...restProps }) {
    if (type === "phone") return <InputPhone {...restProps} />;
    return <input type={type} placeholder={placeholder} {...restProps} />;
}

function InputPhone({ ...restProps }) {
    return (
        <InputMask
            {...restProps}
            mask="+7-999-999-99-99"
            placeholder="+7-999-999-99-99"
        />
    );
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
