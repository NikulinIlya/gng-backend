import React, { useState, useEffect } from "react";

import success from "@/assets/images/icons/order-success.svg";
import canceled from "@/assets/images/icons/order-canceled.svg";
import process from "@/assets/images/icons/order-process.svg";

import "./order-card.scss";

const statuses = {
    success: {
        icon: success,
        label: "Заказ выполнен",
        labelSlug: ""
    },
    canceled: {
        icon: canceled,
        label: "Заказ отменен",
        labelSlug: ""
    },
    process: {
        icon: process,
        label: "Заказ в обработке",
        labelSlug: ""
    }
};

export default function OrderCard({ status = "process" }) {
    return (
        <div className={`order-card ${status}`}>
            <div className="order-card__status-icon">
                <img src={statuses[status].icon} alt="" />
            </div>
            <div className="order-card__common">
                <p className="order-card__no">№ 324524</p>
                <span className="order-card__status-text">
                    {statuses[status].label}
                </span>
            </div>
            <div className="order-card__date">от 15.04 2020</div>
            <div className="order-card__sum">11 300 руб.</div>
        </div>
    );
}
