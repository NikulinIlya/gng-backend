import React from "react";

import useTranslate from "@/utils/useTranslate";

import success from "@/assets/images/icons/order-success.svg";
import canceled from "@/assets/images/icons/order-canceled.svg";
import process from "@/assets/images/icons/order-process.svg";

import "./order-card.scss";

const statuses = {
    success: {
        icon: success,
        label: "Заказ выполнен",
        labelSlug: "executed-order"
    },
    canceled: {
        icon: canceled,
        label: "Заказ отменен",
        labelSlug: "order-cancelled"
    },
    process: {
        icon: process,
        label: "Заказ в обработке",
        labelSlug: "order-in-processing"
    }
};

export default function OrderCard({ status = "process" }) {
    const { t } = useTranslate();
    return (
        <div className={`order-card ${status}`}>
            <div className="order-card__status-icon">
                <img src={statuses[status].icon} alt="" />
            </div>
            <div className="order-card__common">
                <p className="order-card__no">№ 324524</p>
                <span className="order-card__status-text">
                    {t(statuses[status].labelSlug, statuses[status].label)}
                </span>
            </div>
            <div className="order-card__date">от 15.04 2020</div>
    <div className="order-card__sum">11 300{` ${t('rub','руб.')}`}</div>
        </div>
    );
}
