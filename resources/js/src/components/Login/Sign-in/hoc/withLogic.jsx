import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useStoreon } from "storeon/react";

import { history } from "@";
import useForm from "@/utils/useForm";
import { status as REQUEST } from "@/utils/request-status";

const errMessageTemplates = {
    format: "Неверный формат"
};

const initialState = {
    email: "",
    password: ""
};

const rules = {
    email: email =>
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email
        ) || `${errMessageTemplates["format"]}: Email`,
    password: pass =>
        pass.length >= 8 || "Пароль должен состоять не менее, чем из 8 символов"
};

export default WrappedComponent => props => {
    const { submitForm, setStatus, onClose } = props;
    const [state, formDispatch] = useReducer(formReducer, initialState);
    const [isFormTouched, setIsFormTouched] = useState(false);
    const { isFormValid, errors } = useForm({
        formFields: state,
        fieldRules: rules
    });
    const [clientErrors, setClientErrors] = useState([]);
    const { dispatch, pendingRoute } = useStoreon("pendingRoute");

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

            if (!isFormValid) return;
            const [err, response] = await submitForm({
                ...state,
                remember: true
            });

            setStatus(REQUEST.success);

            if (err) {
                setClientErrors([
                    ...clientErrors,
                    "Проверьте корректность введенных данных"
                ]);
                return;
            }

            if (response) {
                dispatch("client/get-user-info", {});
                dispatch("client/set-is-authorized", true);
                pendingRoute && history.push(pendingRoute);
                onClose();
            } else {
                setClientErrors([...clientErrors, "Что-то пошло не так"]);
            }
        },
        [isFormValid]
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
            clientErrors={clientErrors}
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
