import React, { useState, useEffect, useReducer } from "react";
import { useStoreon } from "storeon/react";

import useForm from "@/utils/useForm";

const errMessageTemplates = {
    required: "Заполните поле",
    phone: "Введите номер телефона в формате +7-(xxx)-xxx-xx-xx",
    format: "Неверный формат"
};

const rules = {
    phone: phone =>
        (phone.length >= 16 && phone.indexOf("_") === -1) ||
        errMessageTemplates["phone"],
    old_password: pass =>
        pass.length >= 8 ||
        "Пароль должен состоять не менее, чем из 8 символов",
    password: pass =>
        pass.length >= 8 ||
        "Пароль должен состоять не менее, чем из 8 символов",
    password_confirmation: {
        dependencies: ["password", "password_confirmation"],
        validator: (pass, passConfirm) =>
            (passConfirm.length >= 8 && passConfirm === pass) ||
            "Пароли должны совпадать"
    }
};

const defaultState = {
    phone: "",
    old_password: "",
    password: "",
    password_confirmation: ""
};

export default WrappedComponent => props => {
    const { updateInfo } = props;
    const { userInfo } = useStoreon("userInfo");
    const [state, formDispatch] = useReducer(formReducer, userInfo);
    const [isFormTouched, setIsFormTouched] = useState(false);
    const { Inspector, isFormValid } = useForm({
        formFields: defaultState,
        fieldRules: {}
    });

    const onFieldChange = (field = "", value = "") => {
        if (!field || !state.hasOwnProperty(field))
            throw new Error("Field name is invalid");
        formDispatch({
            type: "set-field-value",
            payload: {
                field,
                value
            }
        });
    };

    const onInputChange = e => {
        const { name, value, checked, type } = e.target;
        const inputValue = type === "checkbox" ? checked : value;
        if (!name) throw new Error("Name should be passed");

        onFieldChange(name, inputValue);
        setIsFormTouched(false);
    };

    const onFormSubmit = async (e, section) => {
        e.preventDefault();
        setIsFormTouched(true);

        if (!isFormValid) return;

        if (section === "common") {
            const { phone, second_name } = state;
            updateInfo({ phone: phone.replace(/-/g, ""), second_name });
        }

        if (section === "agreements") {
            const { events_agreed, discount_agreed } = state;
            updateInfo({ events_agreed, discount_agreed });
        }
    };

    useEffect(() => {
        if (userInfo)
            formDispatch({
                type: "set-fields",
                payload: { ...defaultState, ...userInfo }
            });
    }, [userInfo]);

    useEffect(() => {
        console.log("state", state);
    }, [state]);

    return (
        <WrappedComponent
            {...props}
            formFields={state}
            userInfo={userInfo}
            inspector={Inspector}
            isFormTouched={isFormTouched}
            onFormSubmit={onFormSubmit}
            onInputChange={onInputChange}
        />
    );
};

function formReducer(state, action) {
    switch (action.type) {
        case "set-fields":
            return { ...action.payload };
        case "set-field-value":
            return { ...state, [action.payload.field]: action.payload.value };
        default:
            return state;
    }
}
