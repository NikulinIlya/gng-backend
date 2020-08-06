import React, { useState, useEffect } from "react";

import map from "@/assets/images/contacts-map.jpg";

import marker from "@/assets/images/icons/marker.svg";

import "./contacts.scss";

export default function Contacts() {
    return (
        <div className="contacts-page">
            <div className="container">
                <div className="contacts-page__card">
                    <div className="contacts-page__map">
                        <img src={map} alt="" />
                    </div>
                    <h1 className="contacts-page__title">Контакты</h1>
                    <div className="contacts-page__content">
                        <ul className="contacts-page__info">
                            <li className="contacts-page__info-item info-item">
                                <div className="info-item__icon">
                                    <img
                                        src={
                                            require("@/assets/images/icons/contacts-marker-icon.svg")
                                                .default
                                        }
                                        alt=""
                                    />
                                </div>
                                <h2 className="info-item__key">Адрес</h2>
                                <p className="info-item__value">
                                    г. Москва, ул. Селезневская , дом 19/2
                                </p>
                            </li>
                            <li className="contacts-page__info-item info-item">
                                <div className="info-item__icon">
                                    <img
                                        src={
                                            require("@/assets/images/icons/contacts-phone-icon.svg")
                                                .default
                                        }
                                        alt=""
                                    />
                                </div>
                                <h2 className="info-item__key">Телефон</h2>
                                <p className="info-item__value">
                                    8 (982) 655-50-00
                                </p>
                            </li>
                            <li className="contacts-page__info-item info-item">
                                <div className="info-item__icon">
                                    <img
                                        src={
                                            require("@/assets/images/icons/contacts-time-icon.svg")
                                                .default
                                        }
                                        alt=""
                                    />
                                </div>
                                <h2 className="info-item__key">Время работы</h2>
                                <p className="info-item__value">
                                    Понедельник – пятница с 9.00 до 18.00
                                </p>
                            </li>
                        </ul>
                        <p className="contacts-page__disclaimer">
                            В соответствии с Постановлением Правительства РФ от
                            27.09.2007 N 612 (ред. от 30.11.2019) «Об
                            утверждении Правил продажи товаров дистанционным
                            способом» мы не продаем алкогольную продукцию
                            онлайн.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
