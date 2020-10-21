import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useStoreon } from "storeon/react";

import useForm from "@/utils/useForm";
import { status as REQUEST } from "@/utils/request-status";

const errMessageTemplates = {
    required: "Заполните поле",
    phone: "Введите номер телефона в формате +7-(xxx)-xxx-xx-xx",
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
        (phone.length >= 16 && phone.indexOf("_") === -1) ||
        errMessageTemplates["phone"],
    email: email =>
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email
        ) || `${errMessageTemplates["format"]}: Email`,
    password: pass =>
        pass.length >= 8 ||
        "Пароль должен состоять не менее, чем из 8 символов",
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
    const [clientErrors, setClientErrors] = useState([]);

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

            const [err, response] = await submitForm({
                ...data,
                phone: data.phone.replace(/-/g, ""),
                remember: true
            });

            setStatus(REQUEST.success);

            if (err) {
                if (err.response.status === 422) {
                    setClientErrors([
                        ...clientErrors,
                        "Проверьте корректность введенных данных"
                    ]);
                    return;
                }
                setClientErrors([...clientErrors, "Что-то пошло не так"]);
                return;
            }

            if (response) {
                dispatch("client/set-token", response.data.token);
                dispatch("client/get-user-info", {});
                dispatch("client/set-is-authorized", true);
                onClose();
            }
        },
        [isFormValid, state]
    );

    useEffect(
        _ => {
            setClientErrors([]);
        },
        [isFormTouched]
    );

    return (
        <WrappedComponent
            {...props}
            {...state}
            errors={[...errors, ...clientErrors]}
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
