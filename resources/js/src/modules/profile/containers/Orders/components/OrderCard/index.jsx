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

export default function OrderCard({ status = "process", date, price }) {
    const { t } = useTranslate();
    return (
        <div className={`order-card ${status}`}>
            <div className="order-card__status-icon">
                <img src={statuses[status].icon} alt="" />
            </div>
            <div className="order-card__common">
                <p className="order-card__no">№ {}</p>
                <span className="order-card__status-text">
                    {t(statuses[status].labelSlug, statuses[status].label)}
                </span>
            </div>
            {console.log("date", date)}
            {/* <div className="order-card__date">{date}</div> */}
            <div className="order-card__sum">
                {price}
                {` ${t("rub", "руб.")}`}
            </div>
        </div>
    );
}
