import React, {
    useEffect,
    useReducer,
    createContext,
    useCallback
} from "react";

import Assistant from "@/components/AssistantNotification";
import Button from "@/components/Button";

import useTranslate from "@/utils/useTranslate";

import "./cart-notification.scss";

export const CartNotificationContext = createContext({});

export function CartNotificationProvider({ children }) {
    const [state, dispatch] = useReducer(
        notificationReducer,
        {
            visibility: false,
            title: "Хороший выбор!"
        },
        init
    );

    const onHide = _ => {
        dispatch({ type: "HANDLE_VISIBILITY", payload: false });
    };

    const notify = ({ text }) =>
        dispatch({ type: "HANDLE_VISIBILITY", payload: true, fact: text });

    //hide notification 10 seconds after
    useEffect(
        _ => (
            state.visibility && setTimeout(onHide, 10000), Function.prototype
        ),
        [state.visibility]
    );

    return (
        <CartNotificationContext.Provider value={{ dispatch, notify }}>
            <>
                {children}
                {state.visibility && (
                    <CartNotification
                        title={state.title}
                        fact={state.fact}
                        onHide={onHide}
                    />
                )}
            </>
        </CartNotificationContext.Provider>
    );
}

function notificationReducer(state, action) {
    switch (action.type) {
        case "HANDLE_VISIBILITY":
            return { ...state, visibility: action.payload, fact: action.fact };
    }
}

function init(initialState) {
    return initialState;
}

export default function CartNotification({ title, fact, onHide }) {
    const { t } = useTranslate();
    return (
        <Assistant onClose={onHide}>
            <div className="cart-notification">
                <section className="message">
                    <h3 className="message__title">
                        {t(`good-choice`, title)}
                    </h3>
                    <p className="message__text">Товар добавлен в корзину.</p>
                    <p className="message__fact">{fact}</p>
                </section>
                <div className="actions">
                    <Button variant="gold" onClick={onHide}>
                        Продолжить
                    </Button>
                    <Button onClick={onHide} to="/cart">Оформить заказ</Button>
                </div>
            </div>
        </Assistant>
    );
}
