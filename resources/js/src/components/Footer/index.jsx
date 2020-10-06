import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/images/footer-logo.svg";
import phone from "@/assets/images/icons/phone.svg";
import marker from "@/assets/images/icons/marker.svg";

import adult from "@/assets/images/icons/18plus.svg";

import useTranslate from "@/utils/useTranslate";

import "./footer.scss";

const footerGridData = [
    {
        colName: "Покупателям",
        colNameSlug: "for-our-customers",
        links: [
            {
                label: "О компании",
                labelSlug: "about-us",
                path: "/about"
            },
            {
                label: "Наши бренды",
                labelSlug: "our- brands",
                path: "/brands"
            },
            {
                label: "Ответственное потребление",
                labelSlug: "responsible-consumption",
                path: "/static"
            }
        ]
    },
    {
        colName: "Полезная информация",
        colNameSlug: "useful-information",
        links: [
            {
                label: "Правовая информация",
                labelSlug: "legal-information",
                path: "/static"
            },
            {
                label: "Заказ, получение и оплата",
                labelSlug: "how-to-order-take-and-pay",
                path: "/static"
            },
            {
                label: "Наши мероприятия",
                labelSlug: "our-events",
                path: "/events"
            },
            // {
            //     label: "Винотека G&G",
            //     labelSlug: "",
            //     path: "/static"
            // }
        ]
    },
    {
        colName: "Обратная связь",
        colNameSlug: "contact",
        links: [
            {
                label: "Наши контакты",
                labelSlug: "contacts",
                path: "/contacts"
            },
            {
                label: "Гарантии",
                labelSlug: "guarantee",
                path: "/static"
            }
        ]
    }
];

export default function Footer() {
    const { t } = useTranslate();
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    <div className="footer__common">
                        <div className="footer__logo">
                            <img src={logo} alt="" />
                        </div>
                        <div className="footer__contacts">
                            <div className="contact-item phone">
                                <img
                                    className="contact-item__icon"
                                    src={phone}
                                    alt=""
                                />
                                <a className="contact-item__value" href="">
                                    8 (982) 655-50-00
                                </a>
                            </div>
                            <div className="contact-item address">
                                <img
                                    className="contact-item__icon"
                                    src={marker}
                                    alt=""
                                />
                                <p className="contact-item__value">
                                    {t(
                                        "g-moskva-ul-seleznevskaya-dom-19-2",
                                        "г. Москва,  ул. Селезневская , дом 19/2"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="footer__links-grid">
                        {footerGridData.map(
                            ({ colName, colNameSlug, links }, i) => (
                                <div className="links-col" key={i}>
                                    <h4 className="links-col__title">
                                        {t(colNameSlug, colName)}
                                    </h4>
                                    <ul className="links-col__list">
                                        {links.map(
                                            (
                                                { label, labelSlug, path },
                                                li
                                            ) => (
                                                <li
                                                    className="links-col__item"
                                                    key={li}
                                                >
                                                    <Link to={path}>
                                                        {t(labelSlug, label)}
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className="footer__copy">
                <div className="container">
                    <Copy />
                </div>
            </div>
        </footer>
    );
}

function Copy() {
    const { t } = useTranslate();
    return (
        <div className="footer-copy">
            <div className="copy__item copy__item--disclaimer">
                <img src={adult} alt="" />
                <span>
                    {t(
                        "alcohol-abuse-is-dangerous-for-your-health",
                        "Чрезмерное употребление алкоголя вредит вашему здоровью"
                    )}
                </span>
            </div>
            <div className="copy__item">
                <p>gng.wine</p>
                <p>
                    {t("all-rights-reserved", "Все права защищены")},{" "}
                    {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}
