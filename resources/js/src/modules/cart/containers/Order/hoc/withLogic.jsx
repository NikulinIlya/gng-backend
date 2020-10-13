import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useStoreon } from "storeon/react";

import { history } from "@";
import useForm from "@/utils/useForm";
import { status as REQUEST } from "@/utils/request-status";

const errMessageTemplates = {
    required: "Заполните поле"
};

const initialState = {
    comment: "",
    terms_agreed: true
};

const rules = {
    comment: text =>
        text.length <= 255 || "Превышена максимальная длина комментария",
    terms_agreed: state =>
        Boolean(state) ||
        `${errMessageTemplates["required"]}: Соглашение на обработку персональных данных`
};

export default WrappedComponent => props => {
    const { createOrder, setStatus, history } = props;
    const [state, formDispatch] = useReducer(orderFieldsReducer, initialState);
    const [isFormTouched, setIsFormTouched] = useState(false);
    const { isFormValid, errors } = useForm({
        formFields: state,
        fieldRules: rules
    });
    const [isTermsAgreed, setIsTermsAgreed] = useState(true);
    const [isSuccessModalVisible, setModalState] = useState(false);
    const [clientErrors, setClientErrors] = useState([]);
    const { dispatch, isAuthorized, userInfo, productsInCart } = useStoreon(
        "isAuthorized",
        "userInfo",
        "productsInCart"
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

    const onOrderComplete = () => {
        dispatch("cart/clear");
        setModalState(false);

        history.push("/");
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
            const [err, response] = await createOrder({
                cart: {
                    order: productsInCart.map(p => ({
                        id: p.id,
                        quantity: p.count,
                        unit: "thing"
                    })),
                    promo: null
                },
                comment: state.comment
            });

            setStatus(REQUEST.success);

            if (err) {
                setClientErrors([...clientErrors, "Что-то пошло не так"]);
                return;
            }

            if (response) {
                setModalState(true);
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

    useEffect(
        _ => {
            if (!productsInCart.length) history.push("/cart");
        },
        [productsInCart]
    );

    return (
        <WrappedComponent
            {...props}
            {...state}
            userInfo={userInfo}
            errors={[...errors, ...clientErrors]}
            isFormTouched={isFormTouched}
            isAuthorized={isAuthorized}
            isTermsAgreed={isTermsAgreed}
            isSuccessModalVisible={isSuccessModalVisible}
            onInputChange={onInputChange}
            onFormSubmit={onFormSubmit}
            onOrderComplete={onOrderComplete}
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
