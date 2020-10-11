import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useStoreon } from "storeon/react";

import useForm from "@/utils/useForm";
import { status as REQUEST } from "@/utils/request-status";

const errMessageTemplates = {
    required: "Заполните поле",
    phone: "Введите номер телефона в формате +79998888888 или 89998888888",
    format: "Неверный формат"
};

const initialState = {
    name: "",
    second_name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    discount_agreed: true,
    events_agreed: true,
    terms_agreed: true
};

const rules = {
    name: name =>
        Boolean(name.length) || `${errMessageTemplates["required"]}: Имя`,
    second_name: sName =>
        Boolean(sName.length) || `${errMessageTemplates["required"]}: Фамилия`,
    phone: phone =>
        (phone.length >= 11 && phone.length <= 12) ||
        errMessageTemplates["phone"],
    email: email =>
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email
        ) || `${errMessageTemplates["format"]}: Email`,
    password: pass => pass.length >= 8 || "Ошибка пароля",
    password_confirmation: {
        dependencies: ["password", "password_confirmation"],
        validator: (pass, passConfirm) =>
            (passConfirm.length >= 8 && passConfirm === pass) ||
            "Пароли должны совпадать"
    },
    terms_agreed: state =>
        Boolean(state) ||
        `${errMessageTemplates["required"]}: Соглашение на обработку персональных данных`
};

export default WrappedComponent => props => {
    const { submitForm, setStatus, onClose } = props;
    const [state, formDispatch] = useReducer(formReducer, initialState);
    const [isFormTouched, setIsFormTouched] = useState(false);
    const { isFormValid, errors } = useForm({
        formFields: state,
        fieldRules: rules
    });
    const { dispatch } = useStoreon();

    const onFieldChange = (field = "", value = "") => {
        if (!field || !initialState.hasOwnProperty(field))
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

    const onFormSubmit = useCallback(
        async e => {
            e.preventDefault();
            setIsFormTouched(true);

            const { terms_agreed, ...data } = state;

            if (!isFormValid) return;
            const [err, response] = await submitForm(data);

            setStatus(REQUEST.success);

            if (response) {
                dispatch("client/set-is-authorized", true);
                onClose();
            }
        },
        [isFormValid]
    );

    useEffect(
        _ => {
            console.log("isFormValid", isFormValid);
        },
        [isFormValid]
    );

    return (
        <WrappedComponent
            {...props}
            {...state}
            errors={errors}
            isFormTouched={isFormTouched}
            onInputChange={onInputChange}
            onFormSubmit={onFormSubmit}
        />
    );
};

function formReducer(state, action) {
    switch (action.type) {
        case "set-field-value":
            return { ...state, [action.payload.field]: action.payload.value };
        default:
            return state;
    }
}
