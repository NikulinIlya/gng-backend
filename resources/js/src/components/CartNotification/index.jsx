import React, { useState, useEffect, useReducer, createContext } from "react";

import Assistant from "@/components/AssistantNotification";
import Button from "@/components/Button";

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

    //hide notification 10 seconds after
    useEffect(
        _ => (state.visibility && setTimeout(onHide, 10000), Function.prototype),
        [state.visibility]
    );

    return (
        <CartNotificationContext.Provider value={{ dispatch }}>
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
    return (
        <Assistant onClose={onHide}>
            <div className="cart-notification">
                <section className="message">
                    <h3 className="message__title">{title}</h3>
                    <p className="message__text">Товар добавлен в корзину.</p>
                    <p className="message__fact">{fact}</p>
                </section>
                <div className="actions">
                    <Button variant="gold" onClick={onHide}>
                        Продолжить
                    </Button>
                    <Button>Оформить заказ</Button>
                </div>
            </div>
        </Assistant>
    );
}
