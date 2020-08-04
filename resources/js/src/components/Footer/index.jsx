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
        links: [
            {
                label: "О компании",
                path: ""
            },
            {
                label: "Наши бренды",
                path: ""
            },
            {
                label: "Ответственное потребление",
                path: ""
            }
        ]
    },
    {
        colName: "Полезная информация",
        links: [
            {
                label: "Правовая информация",
                path: ""
            },
            {
                label: "Заказ, получение и оплата",
                path: ""
            },
            {
                label: "Наши мероприятия",
                path: ""
            },
            {
                label: "Винотека G&G",
                path: ""
            }
        ]
    },
    {
        colName: "Обратная связь",
        links: [
            {
                label: "Наши контакты",
                path: ""
            },
            {
                label: "Гарантии",
                path: ""
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
                        {footerGridData.map(({ colName, links }, i) => (
                            <div className="links-col" key={i}>
                                <h4 className="links-col__title">{colName}</h4>
                                <ul className="links-col__list">
                                    {links.map(({ label, path }, li) => (
                                        <li
                                            className="links-col__item"
                                            key={li}
                                        >
                                            <Link to={path}>{label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
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
    return (
        <div className="footer-copy">
            <div className="copy__item copy__item--disclaimer">
                <img src={adult} alt="" />
                <span>
                    Чрезмерное употребление алкоголя вредит вашему здоровью
                </span>
            </div>
            <div className="copy__item">
                <p>Grapes & Grains.com</p>
                <p>Все права защищены, {new Date().getFullYear()}</p>
            </div>
        </div>
    );
}
