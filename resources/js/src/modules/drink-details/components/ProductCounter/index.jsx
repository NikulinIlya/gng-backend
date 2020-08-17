import React, { useState, useEffect } from 'react';

import ProductCounter from "@/components/ProductCounter";

export default function Counter({ price = 1, defaultCount, onAdd }) {
    return (
        <ProductCounter
            price={price}
            defaultCount={defaultCount}
            onAdd={onAdd}
            title="Варианты покупки"
            label={_ => (
                <div className="product__calc-tabs tabs">
                    <label className="tabs__item">
                        <input
                            defaultChecked
                            name="unit"
                            type="radio"
                            className="visually-hidden"
                        />
                        <span>бутылки</span>
                    </label>
                    <label className="tabs__item">
                        <input
                            name="unit"
                            type="radio"
                            className="visually-hidden"
                        />
                        <span>ящики (6 бутылок)</span>
                    </label>
                </div>
            )}
        />
    );
}