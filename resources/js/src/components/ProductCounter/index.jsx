import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import useCounter from "@/utils/useCounter";

import "./product-counter.scss";

export default function ProductCounter({
    title,
    price,
    label,
    defaultCount = 1,
    onAdd
}) {
    const { value, dispatch } = useCounter(defaultCount);
    return (
        <article className="order-counter">
            <div className="order-counter__measures">
                <h3 className="order-counter__measures-title">{title}</h3>
                {label && <div className="order-counter__label">{label()}</div>}
            </div>
            <div className="order-counter__value">
                <div className="order-counter__sum">
                    {price && (
                        <>
                            <span>{price * value}</span> руб.
                        </>
                    )}
                </div>
                <div className="order-counter__nav">
                    <button onClick={_ => dispatch("dec")}>-</button>
                    <span>{value}</span>
                    <button onClick={_ => dispatch("inc")}>+</button>
                </div>
                <div className="order-counter__to-cart">
                    <Button onClick={_ => onAdd(value)}>в корзину</Button>
                </div>
            </div>
        </article>
    );
}
