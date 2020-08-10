import React, { useState, useEffect } from "react";

import Assistant from "@/components/AssistantNotification";
import Button from "@/components/Button";

import "./cart-notification.scss";

export default function CartNotification({}) {
    return (
        <Assistant>
            <div className="cart-notification">
                <section className="message">
                    <h3 className="message__title">Хороший выбор!</h3>
                    <p className="message__text">Товар добавлен в корзину.</p>
                    <p className="message__fact">
                        А вы знали, что в 2012 Ardbeg стала первой вискикурней,
                        попавшей в космос в рамках невероятного эксперимента по
                        изучению выдержки виски в условиях нулевой гравитации?
                    </p>
                </section>
                <div className="actions">
                    <Button variant="gold">Продолжить</Button>
                    <Button>Оформить заказ</Button>
                </div>
            </div>
        </Assistant>
    );
}
