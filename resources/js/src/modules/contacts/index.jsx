import React from "react";

import useTranslate from "@/utils/useTranslate";

import map from "@/assets/images/contacts-map.jpg";

import { contacts } from "@/modules/home/static";

import "./contacts.scss";

export default function Contacts() {
    const { t } = useTranslate();
    return (
        <div className="contacts-page">
            <div className="container">
                <div className="contacts-page__card">
                    <div className="contacts-page__map">
                        <img src={map} alt="" />
                    </div>
                    <h1 className="contacts-page__title">
                        {t("contacts", "Контакты")}
                    </h1>
                    <div className="contacts-page__content">
                        <ul className="contacts-page__info">
                            {contacts.map((item, i) => (
                                <li className="contacts-page__info-item info-item">
                                    <div className="info-item__icon">
                                        <img src={item.icon} alt={item.name} />
                                    </div>
                                    <h2 className="info-item__key">
                                        {t(item.nameSlug, item.name)}
                                    </h2>
                                    <p className="info-item__value">
                                        {t(item.valueSlug, item.value)}
                                    </p>
                                </li>
                            ))}
                            <li className="contacts-page__info-item info-item">
                                <div className="info-item__icon">
                                    <img src={contacts[2].icon} alt={""} />
                                </div>
                                <h2 className="info-item__key">Email</h2>
                                <p className="info-item__value">
                                    info@gng.wine
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
