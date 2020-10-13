import React, { useState, useEffect, useReducer } from "react";
import { useStoreon } from "storeon/react";

import useForm from "@/utils/useForm";

export default WrappedComponent => props => {
    const { createOrder, setStatus } = props;
    const [state, formDispatch] = useReducer(orderFieldsReducer, {});
    const [isFormTouched, setIsFormTouched] = useState(false);
    const { isFormValid, errors } = useForm({
        formFields: state,
        fieldRules: rules
    });
    const { dispatch, isAuthorized, userInfo } = useStoreon(
        "isAuthorized",
        "userInfo"
    );

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
            const [err, response] = await createOrder(state);

            setStatus(REQUEST.success);

            if (response) {
                dispatch("client/set-is-authorized", true);
                onClose();
            }
        },
        [isFormValid]
    );

    useEffect(() => {
        if (userInfo)
            formDispatch({
                type: "set-state",
                payload: userInfo
            });
    }, [userInfo]);

    return (
        <WrappedComponent
            {...props}
            {...state}
            isFormTouched={isFormTouched}
            isAuthorized={isAuthorized}
            errors={errors}
            onInputChange={onInputChange}
            onFormSubmit={onFormSubmit}
        />
    );
};

function orderFieldsReducer(state, action) {
    switch (action.type) {
        case "set-state": {
            return { ...state, ...action.payload };
        }
        case "set-field-value":
            return { ...state, [action.payload.field]: action.payload.value };
        default:
            return state;
    }
}
