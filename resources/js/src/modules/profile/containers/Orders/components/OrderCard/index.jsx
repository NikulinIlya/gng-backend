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

export default function OrderCard({ status = "process", date, price, id }) {
    const { t } = useTranslate();
    return (
        <div className={`order-card ${status}`}>
            <div className="order-card__status-icon">
                <img src={statuses[status].icon} alt="" />
            </div>
            <div className="order-card__common">
                <p className="order-card__no">№ {id}</p>
                <span className="order-card__status-text">
                    {t(statuses[status].labelSlug, statuses[status].label)}
                </span>
            </div>

            <div className="order-card__date">{`${date.getDate()}.${date.getMonth() +
                1}.${date.getFullYear()}`}</div>
            <div className="order-card__sum">
                {price}
                {` ${t("rub", "руб.")}`}
            </div>
        </div>
    );
}
